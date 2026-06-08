const properties =
document.getElementById("properties");

async function fetchProperties() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/properties"
    );

    const data = await response.json();

    properties.innerHTML = "";

    data.forEach((property) => {

      const card =
      document.createElement("div");

      card.style.background =
      "#fff";

      card.style.padding =
      "20px";

      card.style.marginBottom =
      "20px";

      card.style.borderRadius =
      "10px";

      let imageHTML = "";

      if (
        property.images &&
        property.images.length > 0
      ) {

        imageHTML = `

          <img
            src="http://localhost:5000/${property.images[0]}"
            style="
              width:100%;
              max-width:400px;
              height:220px;
              object-fit:cover;
              border-radius:10px;
            "
          >

        `;
      }

      card.innerHTML = `

        ${imageHTML}

        <h2>
          ${property.title}
        </h2>

        <p>
          ${property.location}
        </p>

        <p>
          R ${property.price}
        </p>

      `;

      properties.appendChild(card);

    });

  } catch (error) {

    console.log(error);

  }

}

fetchProperties();