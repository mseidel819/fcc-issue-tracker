const mongoose = require("mongoose");

const issueDataScheme = new mongoose.Schema({
  issue_text: {
    type: String,
    required: true,
  },
  issue_title: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    required: false,
    default: "",
  },
  open: {
    type: Boolean,
    default: true,
  },
  status_text: {
    type: String,
    required: false,
    default: "",
  },
  project: {
    type: String,
    required: true,
  },
});

const Issue = mongoose.model("issue", issueDataScheme);

module.exports = Issue;
