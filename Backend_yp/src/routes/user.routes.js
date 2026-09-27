 const router = require('express').Router();
const AuthController = require('../controller/user.controller');
const users = require("../middleware/auth.middleware")

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginuser);


router.get('/users',users.authuser,AuthController.getAllUsers)
router.get('/current',AuthController.getCurrentUser)

router.delete('/current',AuthController.logoutUser);

module.exports = router;