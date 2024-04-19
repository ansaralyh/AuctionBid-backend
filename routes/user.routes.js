const express = require('express');
const { store, login, forgetPassword, getAllUsers } = require('../coontrollers/userController');
const router = express.Router();

router.post("/users",store)

router.post("/login",login)

router.post("/forgetPassword", forgetPassword)

router.get("/users", getAllUsers)



module.exports = router