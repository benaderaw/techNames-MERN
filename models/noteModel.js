const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    Text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // gives created at and updated at by default
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_filed: "ticket",
  id: "ticketNums",
  start_seq: 500,
});

const Note = mongoose.model("Note", userSchema);

module.exports = Note;
