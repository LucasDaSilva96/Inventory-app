const app = require("express")();
const compression = require("compression");
const cors = require("cors");

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
app.options("*", cors());

// Compress responses for improved performance
app.use(compression());

// Parse URL-encoded data into req.body
app.use(express.urlencoded({ extended: true }));

// ** Routes ↓

module.exports = app;
