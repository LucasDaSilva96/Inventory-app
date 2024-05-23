require("dotenv").config();
const multer = require("multer");
const path = require("path");
// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

const upload = multer({ storage: storage });

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    resource_type: "image",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadImage,
  upload,
};
