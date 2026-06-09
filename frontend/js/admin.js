const API_URL = "https://prime-propertys.onrender.com/api/properties";

async function loadAdminListings() {
  const res = await fetch(API_URL);
  const properties = await res.json();

  const adminDiv = document.getElementById("adminListings");
  adminDiv.innerHTML = "";

  properties.forEach(property => {
    const img = property.images.length > 0 
      ? `https://prime-propertys.onrender.com/${property.images[0]}`
      : "https://via.placeholder.com/400";

    adminDiv.innerHTML += `
      <div class="card">
        <img src="${img}" />
        <div class="card-content">
          
        <h3>${property.title}</h3>

<p>${property.location}</p>

<p class="price">
  R ${property.price}
</p>

<p>
  <strong>Status:</strong>
  ${property.status || "Available"}
</p>

          <button onclick="editProperty('${property._id}')">Edit</button>
          <button onclick="deleteProperty('${property._id}')">Delete</button>
        </div>
      </div>
    `;
  });
}

function editProperty(id) {
  window.location.href = `edit-property.html?id=${id}`;
}

async function deleteProperty(id) {
  if (!confirm("Are you sure you want to delete this property?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadAdminListings();
}

loadAdminListings();