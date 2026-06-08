const express = require("express");
const router = express.Router();

const Enquiry = require("../models/Enquiry");
const protect = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

// ======================
// CREATE ENQUIRY (PUBLIC)
// ======================

router.post("/", async (req, res) => {

  try {

    const enquiry = new Enquiry({

      propertyId: req.body.propertyId,
      propertyTitle: req.body.propertyTitle,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message

    });

    await enquiry.save();
    await sendEmail(

  "New Property Enquiry",

  `
Property: ${req.body.propertyTitle}

Name: ${req.body.name}

Email: ${req.body.email}

Phone: ${req.body.phone}

Message:
${req.body.message}
`

);

    res.status(201).json({
      message: "Enquiry sent successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// ======================
// VIEW ENQUIRIES
// ======================

router.get("/", protect, async (req, res) => {

  try {

    const enquiries =
    await Enquiry.find()
    .sort({ createdAt: -1 });

    res.json(enquiries);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// ======================
// MARK AS CONTACTED
// ======================

router.put("/:id/contacted", protect, async (req, res) => {

  try {

    const enquiry =
    await Enquiry.findByIdAndUpdate(

      req.params.id,

      {
        status: "Contacted"
      },

      {
        new: true
      }

    );

    res.json(enquiry);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// ======================
// DELETE ENQUIRY
// ======================

router.delete("/:id", protect, async (req, res) => {

  try {

    await Enquiry.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Enquiry deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;