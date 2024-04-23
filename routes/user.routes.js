const express = require('express');
const { store, login, forgetPassword, getAllUsers, getTotalUsers } = require('../coontrollers/userController');
const router = express.Router();

router.post("/",store);
router.get("/",getAllUsers);
router.get("/count",getTotalUsers);
router.post("/login",login);
router.post("/forgetPassword",forgetPassword);




module.exports = router;