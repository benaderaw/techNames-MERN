const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Employee",
    enum: ["Employee", "admin", "manager"],
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
