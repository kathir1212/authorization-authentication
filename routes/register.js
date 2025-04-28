var express = require('express');
var router = express.Router();
const registerModel = require('../models/register');
const Register = require('../controllers/registerController')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware'); 



router.get('/register', Register.getRegister);
router.get('/register/:id', Register.getUserById);  
router.post('/register', Register.registerUser);
router.put('/register/:id', Register.updateUser);
router.delete('/register/:id', Register.deleteUser);
router.post("/login", Register.loginUser);
router.get('/userinfo', auth, Register.getUserProfile);







module.exports = router;
