// server.js
const express = require("express");

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Serve a static HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Example API route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express server 🚀" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
