const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hassPass: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userShema);
module.exports = User;
