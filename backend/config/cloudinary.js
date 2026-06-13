const cloudinary = require("cloudinary").v2;

console.log("ALL ENV KEYS:");
console.log(Object.keys(process.env).filter(k =>
  k.includes("CLOUDINARY") ||
  k.includes("MONGO") ||
  k.includes("JWT")
));

console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("SECRET EXISTS:", !!process.env.CLOUDINARY_API_SECRET);

module.exports = cloudinary;