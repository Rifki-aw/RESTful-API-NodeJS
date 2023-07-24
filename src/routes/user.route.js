// // 19. import express
// const express = require('express');

// const userController = require('../controllers/user.controller');

// // 20. instansi router dari express
// const router = express.Router();

// // 21. membuat router untuk mengirim data baru
// router.post('/register', userController.register);
// // 24. membuat route login
// router.post('/login', userController.login);

// module.exports = router

const express = require('express');
const userController = require('../controllers/user.controller');
const passport = require('passport');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/edit', passport.authenticate('jwt', {session:false}), userController.update);
router.get('/view', passport.authenticate('jwt', {session:false}), userController.viewUser);
router.delete('/delete', passport.authenticate('jwt', {session:false}), userController.deleteUser);

module.exports = router
