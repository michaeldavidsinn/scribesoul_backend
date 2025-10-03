// routes/post.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');
const middleware = require('../middleware/auth.middleware');

// Semua rute di file ini diproteksi
router.use(middleware.verifyToken);

// Rute untuk mengambil semua post dan membuat post baru
router.get('/', controller.getAllPosts);
router.post('/', controller.createPost);

module.exports = router;