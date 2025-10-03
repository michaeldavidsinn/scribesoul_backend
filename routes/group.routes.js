// routes/group.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/group.controller');
const middleware = require('../middleware/auth.middleware');

// Proteksi semua rute di file ini
router.use(middleware.verifyToken);

router.get('/', controller.getAllGroups);
router.post('/:groupId/join', controller.joinGroup);
router.get('/:groupId/messages', controller.getGroupMessages);
router.post('/:groupId/messages', controller.sendMessage);

module.exports = router;