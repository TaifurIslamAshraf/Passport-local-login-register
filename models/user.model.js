const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plase Enter Your name"],
  },
  email: {
    type: String,
    required: [true, "plase Enter Your email"],
  },
  password: {
    type: String,
    required: [true, "plase Enter Your Password"],
  },
  createOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", userShcema);
