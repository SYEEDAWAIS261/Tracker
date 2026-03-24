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
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Connection Error:', err));

// Routes
app.use('/api', trackerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Tracker Server running on port ${PORT}`));