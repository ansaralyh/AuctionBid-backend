const express = require('express');
const { store, login, forgetPassword, getAllUsers } = require('../coontrollers/userController');
const router = express.Router();

router.post("/",store);
router.post("/login",login);
router.post("/forgetPassword",forgetPassword);




module.exports = router;