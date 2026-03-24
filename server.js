const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const trackerRoutes = require('./routes/trackerRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.set('trust proxy', true);

// Connect to MongoDB
const dbURI = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : "";
mongoose.connect(dbURI)
  .then(() => console.log("✅ LIVE: Connected to Database"))
  .catch((err) => {
    console.log("❌ CONNECTION FAILED");
    // Ye line aapko real problem batayegi logs mein
    console.log("URI Starts with:", dbURI.substring(0, 15)); 
  });
// Routes
app.use('/api', trackerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Tracker Server running on port ${PORT}`));