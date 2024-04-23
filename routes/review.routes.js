const express = require('express');
const { createReview, getTotalReviews } = require('../coontrollers/reviewController');


const router = express.Router();

router.post('/', createReview);
router.get('/count', getTotalReviews)



module.exports = router