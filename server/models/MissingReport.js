// models/MissingReport.js
const mongoose = require('mongoose');

const missingReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  lastSeenLocation: {
    type: String,
    required: true
  },
  dateLastSeen: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  submittedBy: {
    type: String,
    default: 'Anonymous'
  },
  s3ObjectKey: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MissingReport', missingReportSchema);
