const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    default: "Available"
  }
});

module.exports = mongoose.model("Property", propertySchema);

async function deleteProperty(id) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this property?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(

      `http://localhost:5000/api/properties/${id}`,

      {
        method: "DELETE",

        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("✅ Property deleted");

      location.reload();

    } else {

      alert("❌ " + data.message);

    }

  } catch (error) {

    console.log(error);

    alert("❌ Delete failed");

  }

}