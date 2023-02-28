require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const { createHash } = require("crypto");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const User = require("./models/user");
const Audio = require("./models/audio");
const { base } = require("./models/user");

const app = express();
const PORT = 8080;

//Connecting to mongoDB
const MONGODB_LOGIN = process.env.MONGODB_LOGIN;
const MONGODB_PASS = process.env.MONGODB_PASS;

const dbURI =
  "mongodb+srv://" +
  MONGODB_LOGIN +
  ":" +
  MONGODB_PASS +
  "@freettsdb.6gathmr.mongodb.net/freeTTSdb?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB"),
      app.listen(PORT, () => console.log("http://localhost:" + PORT));
  })
  .catch((err) => console.log(err));

//Middleware for JSON
app.use(express.json());
// allow requests from http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/login", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  //Hashing password
  function hash(password) {
    return createHash("sha256").update(password).digest("base64");
  }

  const pass = hash(req.body.pass);

  console.log("Name: " + name);
  console.log("Email: " + email);
  console.log("Pass: " + pass);
  res.status(200).json({ message: "Success" }); // Return JSON

  //Saving data to DB
  const user = new User({
    name: name,
    email: email,
    hassPass: pass,
  });
  user
    .save()
    .then((result) => {
      console.log("Saved to database:", result);
    })
    .catch((err) => console.log(err));
});

app.post("/prompt", (req, res) => {
  const language = req.body.language;
  const text = req.body.text;
  const audio = new Audio({
    text: text,
    lang: language,
    userID: "123",
  });

  audio
    .save()
    .then((result) => {
      console.log("Saved to database:", result);
    })
    .catch((err) => console.log(err));

  console.log("text = " + text);
  console.log("lang = " + language);

  const { spawn } = require("child_process");

  // Running Python script
  const pythonProcess = spawn("python", ["app.py", text, language]);

  // Przechwytywanie danych z wyjścia standardowego procesu Pythona
  pythonProcess.stdout.on("data", (data) => {
    console.log(`Received data from Python: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error received from Python: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  res.status(200).json({ message: "Success" }); // Return JSON
});
