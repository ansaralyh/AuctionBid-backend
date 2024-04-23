const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes')
const contactRoutes = require('./contact.routes')
const productRoutes = require('./product.routes')
const emailRoutes = require('./email.routes')
const reviewRoutes = require('./review.routes')

router.use('/users', userRoutes)
router.use('/contact',contactRoutes)
router.use('/product',productRoutes)
router.use('/email', emailRoutes)
router.use('/review', reviewRoutes)


module.exports = router