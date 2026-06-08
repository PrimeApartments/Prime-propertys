const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

// ==========================
// ADMIN LOGIN
// ==========================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // ADMIN DETAILS

    const adminEmail =
      "admin@gmail.com";

    const adminPassword =
      "123456";

    // CHECK LOGIN

    if (
      email !== adminEmail ||
      password !== adminPassword
    ) {

      return res.status(401).json({
        message: "Invalid credentials"
      });

    }

    // CREATE TOKEN

    const token = jwt.sign(

      {
        email: adminEmail
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.json({

      token,

      message:
      "Login successful"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;