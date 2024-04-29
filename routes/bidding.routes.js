const express = require('express');
const { biddingOnProduct, getHighestBid, totalBids, getProductBids } = require('../coontrollers/biddingController');
const { auth, isAuthorizedRole } = require('../middlewares/authentication')

const router = express.Router();

router.post('/',auth,isAuthorizedRole(['user','admin']),biddingOnProduct);
router.get('/highestBid',auth,isAuthorizedRole(['user','admin']),getHighestBid);
router.get('/totalBids',auth,isAuthorizedRole(['user','admin']),totalBids);
router.get('/get/:id',getProductBids)

 
module.exports = router