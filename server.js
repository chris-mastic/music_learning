const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors()); // This will allow all origins
// Serve the index.html file when the root URL is accessed

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/dynamics", (req, res) => {
  res.sendFile(path.join(__dirname, "dynamics.html"));
});
app.get("/dynamics/help", (req, res) => {
  res.sendFile(path.join(__dirname, "help/dynamics_help.html"));
});

app.get("/metronome", (req, res) => {
  res.sendFile(path.join(__dirname, "metronome.html"));
});

app.get("/composite", (req, res) => {
  res.sendFile(path.join(__dirname, "composite.html"));
});

// Set the port to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
