const mongoose = require("mongoose");

//user schema added
const userSchema = new mongoose.Schema({
  userName: {
    required: "user name is required",
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  exercise: [{
    description: {
      required: "user description is required",
      type: String,
      trim: true
    },
    duration: {
      required: "duration is required",
      type: String,
    },
    date: {
      type: Date,
      default: new Date()
    }
  }]
})

//user model
const User = mongoose.model('User', userSchema);
module.exports = User;
