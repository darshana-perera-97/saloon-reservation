const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5011; // Changed PORT to 5011

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

// Basic GET Route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
