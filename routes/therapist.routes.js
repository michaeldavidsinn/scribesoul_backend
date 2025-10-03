// routes/therapist.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/therapist.controller');
const middleware = require('../middleware/auth.middleware');

// Semua rute di file ini akan diproteksi oleh middleware verifyToken
router.use(middleware.verifyToken);

// Definisikan rute
router.get('/', controller.getAllTherapists);
router.get('/:id', controller.getTherapistById);

module.exports = router;