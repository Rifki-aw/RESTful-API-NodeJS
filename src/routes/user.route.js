// 19. import express
const express = require('express');

const userController = require('../controllers/user.controller');

// 20. instansi router dari express
const router = express.Router();

// 21. membuat router untuk mengirim data baru
router.post('/register', userController.register);

module.exports = router