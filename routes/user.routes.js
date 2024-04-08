const express = require('express');
const { store, login } = require('../coontrollers/userController');
const router = express.Router();

router.post("/",store)
router.post("/login",login)



module.exports = router