const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 5011;

// Middleware
app.use(cors());
app.use(express.json());

// File path
const filePath = path.join(__dirname, "saloons.js");

// Check if file exists; if not, create it
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(
    filePath,
    "const saloons = [];\n\nmodule.exports = saloons;"
  );
}

// Import saloons array
let saloons = require("./saloons");

// Create Saloon API
app.post("/createSaloon", (req, res) => {
  const { saloonName, email, contact, password } = req.body;

  // Validation
  if (!saloonName || !email || !contact || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Generate Saloon ID
  const saloonId = `SAL-${Date.now()}`;
  const newSaloon = { saloonId, saloonName, email, contact, password };

  // Push to saloons array
  if (!Array.isArray(saloons)) saloons = []; // Ensure it's an array
  saloons.push(newSaloon);

  // Write to file
  const fileContent = `const saloons = ${JSON.stringify(
    saloons,
    null,
    2
  )};\n\nmodule.exports = saloons;`;

  try {
    fs.writeFileSync(filePath, fileContent);
    res.status(201).json({ message: "Saloon created successfully!", saloonId });
  } catch (error) {
    console.error("File write error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Root API
app.get("/", (req, res) => {
  res.send("Welcome to the Saloon API!");
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
