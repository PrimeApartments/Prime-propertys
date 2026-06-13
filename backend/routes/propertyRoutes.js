const express = require("express");
const router = express.Router();

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const Property = require("../models/Property");
const protect = require("../middleware/authMiddleware");

// ======================
// CLOUDINARY STORAGE
// ======================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "prime-properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
});

// ======================
// GET ALL PROPERTIES
// ======================

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// GET SINGLE PROPERTY
// ======================

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// ADD PROPERTY
// ======================

router.post("/", protect, upload.array("images", 10), async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.path) : [];

    const property = new Property({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      status: req.body.status || "Available",
      description: req.body.description,
      images: images,
    });

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// UPDATE PROPERTY
// ======================

router.put("/:id", protect, upload.array("images", 10), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    property.title = req.body.title;
    property.location = req.body.location;
    property.price = req.body.price;
    property.bedrooms = req.body.bedrooms;
    property.bathrooms = req.body.bathrooms;
    property.description = req.body.description;
    property.status = req.body.status;

    if (req.files && req.files.length > 0) {
      property.images = req.files.map((file) => file.path);
    }

    await property.save();

    res.json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// DELETE PROPERTY
// ======================

router.delete("/:id", protect, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
