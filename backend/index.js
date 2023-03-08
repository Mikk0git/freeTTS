require("dotenv").config({ path: "../.env" });
const { spawn } = require("child_process");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { createHash } = require("crypto");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/user");
const Audio = require("./models/audio");
const { base } = require("./models/user");
const path = require("path");

const app = express();
const PORT = 8080;

//Connecting to mongoDB

const dbURI =
  "mongodb+srv://" +
  process.env.MONGODB_LOGIN +
  ":" +
  process.env.MONGODB_PASS +
  "@freettsdb.6gathmr.mongodb.net/freeTTSdb?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB"),
      app.listen(PORT, () => console.log("http://localhost:" + PORT));
  })
  .catch((err) => console.log(err));

//MongoDB Session
const store = new MongoDBStore({
  uri: dbURI,
  collection: "sessions",
});
store.on("error", function (error) {
  console.log(error);
});

//Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Hashing password
function hash(password) {
  return createHash("sha256").update(password).digest("base64");
}

async function runPythonScript(text, language, usrID, audioID) {
  return new Promise((resolve, reject) => {
    // Running Python script
    const pythonProcess = spawn("python", [
      "app.py",
      text,
      language,
      usrID,
      audioID,
    ]);

    // Przechwytywanie danych z wyjścia standardowego procesu Pythona
    pythonProcess.stdout.on("data", (data) => {
      console.log(`Received data from Python: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error received from Python: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      resolve();
    });

    pythonProcess.on("error", (error) => {
      console.error(`Error running Python script: ${error}`);
      reject(error);
    });
  });
}

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = hash(req.body.pass);

  console.log("Name: " + name);
  console.log("Email: " + email);
  console.log("Pass: " + pass);

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res
          .status(409)
          .json({ error: "This email address is already registered" });
      } else {
        User.findOne({ name: name }).then((user) => {
          if (user) {
            res.status(409).json({ error: "This name is already registered" });
          } else {
            //Saving data to DB
            const user = new User({
              name: name,
              email: email,
              hashPass: pass,
            });
            user
              .save()
              .then((result) => {
                console.log("Saved to database:", result);
                res.json({ message: "Success" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send("Internal server error");
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.post("/login", (req, res) => {
  const pass = hash(req.body.pass);
  const email = req.body.email;

  User.findOne({ email: email, hashPass: pass })
    .then((user) => {
      if (user) {
        // setting session
        req.session.user = user._id;
        req.session.isAuth = true;
        console.log(req.session.isAuth);
        console.log(req.session.user + "logged in");

        res.status(200).send("Logged " + req.session.user);
        return req.session.user;
      } else {
        res.status(401).send("Incorrect login details");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.post("/login/verify", async (req, res) => {
  console.log(req.session);

  if (req.session && req.session.user) {
    const userName = await User.findById({ _id: req.session.user });
    console.log(userName.name);
    res.status(200).send({
      message: "User is logged in",
      userID: req.session.user,
      userName: userName.name,
    });
  } else {
    res.status(401).send("User isn't logged in");
  }
});

app.post("/logout", (req, res) => {
  console.log(req.session.user + " logged out");

  req.session.destroy((err) => {
    if (err) throw err;
    else {
      res.status(200).send(" logged out");
    }
  });
});

app.post("/prompt", (req, res) => {
  const language = req.body.language;
  const text = req.body.text;
  let usrID = req.session.user;
  const isAuth = req.session.isAuth;

  const audio = new Audio({
    text: text,
    lang: language,
    userID: usrID,
  });

  audio
    .save()
    .then((result) => {
      console.log("Saved to database:", result);
      const audioID = result._id.toString();
      usrID === undefined ? (usrID = "undefined") : (usrID = usrID.toString());

      console.log("text = " + text);
      console.log("lang = " + language);
      console.log("userID = " + usrID);
      console.log("isAuth = " + isAuth);
      console.log("audioID = " + audioID);
      runPythonScript(text, language, usrID, audioID)
        .then(() => {
          const filePath = path.join(
            __dirname,
            "audio",
            usrID,
            audioID + ".mp3"
          );
          console.log("File path:", filePath);
          res.sendFile(filePath);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.post("/userAudio", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    (async () => {
      try {
        const usersAudio = await Audio.find({ userID: req.session.user });
        console.log("User's audio: " + usersAudio);
        res
          .status(200)
          .send({ message: "User is logged in", usersAudio: usersAudio });
      } catch (err) {
        console.error(err);
      }
    })();
  } else {
    res.status(401).send("User isn't logged in");
  }
});

app.post("/deleteAudio", async (req, res) => {
  const audioID = req.body.id;
  try {
    const deletedAudio = await Audio.findByIdAndRemove(audioID);
    console.log(deletedAudio);
    res.send({
      message: "Audio deleted successfully",
      deletedAudio: deletedAudio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting audio");
  }
});

app.post("/loadAudio", async (req, res) => {
  const audioID = req.body.id.toString();
  const usrID = req.session.user.toString();

  try {
    const loadedAudio = await Audio.findById(audioID);
    console.log(loadedAudio);
    const filePath = path.join(__dirname, "audio", usrID, audioID + ".mp3");
    console.log(filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading audio");
  }
});
