const API_URL =
"http://localhost:5000/api/properties";

const ENQUIRY_URL =
"http://localhost:5000/api/enquiries";

function getId() {

  const params =
  new URLSearchParams(
    window.location.search
  );

  return params.get("id");

}

async function loadProperty() {

  try {

    const id = getId();

    const response =
    await fetch(
      `${API_URL}/${id}`
    );

    const property =
    await response.json();

    document.getElementById(
      "title"
    ).innerText =
    property.title;

    document.getElementById(
      "location"
    ).innerText =
    property.location;

    document.getElementById(
      "price"
    ).innerText =
    "R " + property.price;

    document.getElementById(
      "rooms"
    ).innerText =
    `${property.bedrooms} Bedrooms | ${property.bathrooms} Bathrooms`;

   const statusElement =
document.getElementById("status");

statusElement.innerText =
property.status || "Available";

if(property.status === "Available"){

  statusElement.style.background =
  "#28a745";

}

else if(property.status === "Reserved"){

  statusElement.style.background =
  "#ffc107";

  statusElement.style.color =
  "#000";

}

else if(property.status === "Sold"){

  statusElement.style.background =
  "#dc3545";

}

else if(property.status === "Rented"){

  statusElement.style.background =
  "#007bff";

}

statusElement.style.padding =
"5px 10px";

statusElement.style.borderRadius =
"20px";

statusElement.style.color =
statusElement.style.color || "#fff";

statusElement.style.fontWeight =
"bold";

    // MAIN IMAGE

    const mainImage =
    document.getElementById(
      "mainImage"
    );

    if (
      property.images &&
      property.images.length > 0
    ) {

      mainImage.src =
      `http://localhost:5000/${property.images[0]}`;

    }

    // IMAGE GALLERY

    const thumbnails =
    document.getElementById(
      "thumbnails"
    );

    thumbnails.innerHTML = "";

    if (
      property.images &&
      property.images.length > 0
    ) {

      property.images.forEach(
        (image) => {

          const thumb =
          document.createElement(
            "img"
          );

          thumb.src =
          `http://localhost:5000/${image}`;

          thumb.style.width =
          "120px";

          thumb.style.height =
          "80px";

          thumb.style.objectFit =
          "cover";

          thumb.style.cursor =
          "pointer";

          thumb.style.borderRadius =
          "8px";

          thumb.onclick =
          function () {

            mainImage.src =
            `http://localhost:5000/${image}`;

          };

          thumbnails.appendChild(
            thumb
          );

        }
      );

    }

    // WHATSAPP BUTTON

    const phone =
    "27821234567"; // CHANGE TO YOUR NUMBER

    const whatsappMessage =

`Hi, I'm interested in:

${property.title}

Location: ${property.location}

Price: R ${property.price}

Please contact me regarding availability.`;

    document.getElementById(
      "whatsappBtn"
    ).href =

`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

    // ENQUIRY FORM

    document.getElementById(
      "enquiryForm"
    ).addEventListener(
      "submit",
      async function(e) {

        e.preventDefault();

        const enquiry = {

          propertyId:
          property._id,

          propertyTitle:
          property.title,

          name:
          document.getElementById(
            "name"
          ).value,

          email:
          document.getElementById(
            "email"
          ).value,

          phone:
          document.getElementById(
            "phone"
          ).value,

          message:
          document.getElementById(
            "message"
          ).value

        };

        try {

          const response =
          await fetch(
            ENQUIRY_URL,
            {
              method: "POST",

              headers: {
                "Content-Type":
                "application/json"
              },

              body:
              JSON.stringify(
                enquiry
              )
            }
          );

          const data =
          await response.json();

          alert(
            data.message
          );

          document.getElementById(
            "enquiryForm"
          ).reset();

        }

        catch(error) {

          console.log(error);

          alert(
            "Failed to send enquiry"
          );

        }

      }
    );

  }

  catch(error) {

    console.log(error);

  }

}

loadProperty();