const API_URL = "http://localhost:5000/api/properties";

document.getElementById("propertyForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", document.getElementById("title").value);
  formData.append("location", document.getElementById("location").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("bedrooms", document.getElementById("bedrooms").value);
  formData.append("bathrooms", document.getElementById("bathrooms").value);
  formData.append("description", document.getElementById("description").value);

  const images = document.getElementById("images").files;
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData
  });

  if (res.ok) {
    alert("Property uploaded successfully!");
    window.location.href = "admin.html";
  } else {
    alert("Upload failed!");
  }
});