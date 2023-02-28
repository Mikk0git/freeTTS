const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const audioShema = new Schema({
  lang: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Audio = mongoose.model("audio", audioShema);
module.exports = Audio;
