// routes/profile.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/profile.controller');
const middleware = require('../middleware/auth.middleware');

// Rute ini diproteksi oleh middleware verifyToken
router.post('/onboarding', middleware.verifyToken, controller.saveOnboarding);

module.exports = router;