// 19. import express
const express = require('express');

const userController = require('../controllers/user.controller');

// 20. instansi router dari express
const router = express.Router();

// 21. membuat router untuk mengirim data baru
router.post('/register', userController.register);
// 24. membuat route login
router.post('/login', userController.login);

module.exports = router