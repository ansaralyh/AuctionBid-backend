const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes')
const contactRoutes = require('./contact.routes')
const productRoutes = require('./product.routes')

router.use('/users', userRoutes)
router.use('/contact',contactRoutes)
router.use('/product',productRoutes)


module.exports = router