const mongoose = require('mongoose');

const TargetSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    os: String,
    device: String,
    browser: String,
    battery: String,
    screen: String,
    userAgent: String,
    connectionType: String, // WiFi, 4G, etc.
    downlink: String,       // Network speed in Mbps
    rtt: String,            // Latency (Ping)
    city: String,
    country: String,
    isp: String, // e.g., Nayatel, Jazz, PTCL
    timezone: String,
    openedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Target', TargetSchema);