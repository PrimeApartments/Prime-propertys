const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String, required: true },

  status: {
    type: String,
    default: "Available"
  },

  images: [{ type: String }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Property", propertySchema);