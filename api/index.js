const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Your routes
app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Export the app as a Vercel-compatible handler
module.exports = app;