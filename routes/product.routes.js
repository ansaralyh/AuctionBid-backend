const express = require('express');
const { store } = require('../coontrollers/productController');
const { auth, isAuthorizedRole } = require('../middlewares/authentication')
const router = express.Router();

router.post('/',auth,isAuthorizedRole(['user','admin']),store)


module.exports= router