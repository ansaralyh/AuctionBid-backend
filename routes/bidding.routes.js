const express = require('express');
const { biddingOnProduct } = require('../coontrollers/biddingController');
const { auth, isAuthorizedRole } = require('../middlewares/authentication')

const router = express.Router();

router.post('/',auth,isAuthorizedRole(['user','admin']),biddingOnProduct)


module.exports = router