const express = require('express');
const { biddingOnProduct, getHighestBid, totalBids } = require('../coontrollers/biddingController');
const { auth, isAuthorizedRole } = require('../middlewares/authentication')

const router = express.Router();

router.post('/',auth,isAuthorizedRole(['user','admin']),biddingOnProduct);
router.get('/highestBid',auth,isAuthorizedRole(['user','admin']),getHighestBid);
router.get('/totalBids',auth,isAuthorizedRole(['user','admin']),totalBids);


 
module.exports = router