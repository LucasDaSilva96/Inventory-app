require("dotenv").config();
const multer = require("multer");

// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, "./public/images/");
    } else {
      cb(new Error("Failed to upload image"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const sendImagePathName = (req, res, next) => {
  if (req.file) {
    req.uploadedImage = req.file.path;
  }
  next();
};

const upload = multer({ storage });

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "Inventory-App",
    resource_type: "image",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);

    return {
      image_url: result.secure_url,
      image_name: result.public_id,
      image_original_name: `${result.original_filename}.${result.format}`,
    };
  } catch (error) {
    throw new Error(error.error.toString());
  }
};

module.exports = {
  uploadImage,
  upload,
  sendImagePathName,
  cloudinary,
};
