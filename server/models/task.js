const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
    unique: true,
  },
  description: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    default: "unstarted",
    enum: ["unstarted", "inprogress", "completed"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
