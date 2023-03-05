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
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  userID: {
    type: String,
    // type: mongoose.SchemaType.ObjectId,
    required: false,
  },
});

const Audio = mongoose.model("audio", audioShema);
module.exports = Audio;
