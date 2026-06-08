const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ======================
// ROUTES
// ======================

const propertyRoutes =
require("./routes/propertyRoutes");

const authRoutes =
require("./routes/authRoutes");

const enquiryRoutes =
require("./routes/enquiryRoutes");

// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// ======================
// STATIC UPLOADS
// ======================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ======================
// API ROUTES
// ======================

app.use(
  "/api/properties",
  propertyRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/enquiries",
  enquiryRoutes
);

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {

  res.send(
    "Prime Property Backend Running 🚀"
  );

});

// ======================
// DATABASE CONNECTION
// ======================

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected ✅"
  );

})

.catch((error) => {

  console.log(error);

});

// ======================
// START SERVER
// ======================

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT} 🚀`
  );

});