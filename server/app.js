const app = require("express")();
const compression = require("compression");
const express = require("express");
const cors = require("cors");
const categoryRoute = require("./routes/categoryRoutes");
const { upload } = require("./utils/uploadImage");

// Trust proxy for secure deployment environments
app.enable("trust proxy");

// Serve static files from the 'public' directory
app.use("/public", express.static("public"));

// Parse incoming JSON data into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

// Enable CORS for all routes
app.use(cors());

// Compress responses for improved performance
app.use(compression());

app.post("/api/upload", upload.single("image_url"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.status(200).send("File uploaded successfully");
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
});
// Parse URL-encoded data into req.body
app.use(express.urlencoded({ extended: true }));

// ** Routes ↓
app.use("/api", categoryRoute);

module.exports = app;
