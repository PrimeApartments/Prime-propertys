const API_URL = "http://localhost:5000/api/properties";

function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadProperty() {
  const id = getId();
  const res = await fetch(`${API_URL}/${id}`);
  const property = await res.json();

  document.getElementById("title").value = property.title;
  document.getElementById("location").value = property.location;
  document.getElementById("price").value = property.price;
  document.getElementById("bedrooms").value = property.bedrooms;
  document.getElementById("bathrooms").value = property.bathrooms;
  document.getElementById("description").value = property.description;
}

document.getElementById("editForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const id = getId();
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

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData
  });

  if (res.ok) {
    alert("Property updated!");
    window.location.href = "admin.html";
  } else {
    alert("Update failed!");
  }
});

loadProperty();