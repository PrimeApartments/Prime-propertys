const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },

  propertyTitle: {
    type: String
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  message: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "New"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Enquiry",
  enquirySchema
);