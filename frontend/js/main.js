const API_URL = "http://localhost:5000/api/properties";

async function loadLatestProperties() {

  try {

    const res = await fetch(API_URL);
    const properties = await res.json();

    const latestDiv =
    document.getElementById("latestProperties");

    latestDiv.innerHTML = "";

    properties.forEach(property => {

      let imagesHTML = "";

      if (
        property.images &&
        property.images.length > 0
      ) {

        imagesHTML = `
          <img
            src="http://localhost:5000/${property.images[0]}"
            style="
              width:100%;
              height:250px;
              object-fit:cover;
              border-radius:10px;
            "
          >
        `;

      } else {

        imagesHTML = `
          <img
            src="https://via.placeholder.com/400"
            style="
              width:100%;
              height:250px;
              object-fit:cover;
              border-radius:10px;
            "
          >
        `;

      }

      latestDiv.innerHTML += `

        <div
          class="card"
          onclick="viewProperty('${property._id}')"
          style="
            background:white;
            padding:15px;
            border-radius:10px;
            cursor:pointer;
            box-shadow:0 2px 10px rgba(0,0,0,0.1);
          "
        >

          ${imagesHTML}

          <div class="card-content">

            <h3>${property.title}</h3>

            <p>${property.location}</p>

            <p class="price">
              R ${property.price}
            </p>

            <p>
              ${property.bedrooms} Bed |
              ${property.bathrooms} Bath
            </p>

          </div>

        </div>

      `;

    });

  } catch (error) {

    console.log(error);

  }

}

function viewProperty(id) {

  window.location.href =
  `property.html?id=${id}`;

}

function searchProperties() {

  const location =
  document.getElementById("location").value;

  const minPrice =
  document.getElementById("minPrice").value;

  const maxPrice =
  document.getElementById("maxPrice").value;

  window.location.href =
  `listings.html?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

}

loadLatestProperties();