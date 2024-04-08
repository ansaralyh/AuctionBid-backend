const express = require('express');
const { store } = require('../coontrollers/userController');
const router = express.Router();

router.post("/",store)



module.exports = router