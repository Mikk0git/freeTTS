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

app.post("/prompt", (req, res) => {
  const language = req.body.language;
  const text = req.body.text;
  const usrID = req.session.user;
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
      const audioID = result._id;

      console.log("text = " + text);
      console.log("lang = " + language);
      console.log("userID = " + usrID);
      console.log("isAuth = " + isAuth);
      console.log("audioID = " + audioID);

      runPythonScript(text, language, usrID, audioID);
    })
    .catch((err) => console.log(err));
});
