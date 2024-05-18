require("dotenv").config();
const mongoose = require("mongoose");

// Import the main application
const app = require("./app");

// Get database connection URI from environment variables
mongoose
  .connect(process.env.DB)
  .then(() => console.log("Successfully connected to database✅"))
  .catch(() => console.log("Couldn't connect to database❌"));

// Define the port number for the server to listen on
const port = process.env.PORT || 8000;

// Start the server and listen for incoming requests on the specified port
const SERVER = app.listen(port, () =>
  console.log(`App running on port: ${port}`)
);
