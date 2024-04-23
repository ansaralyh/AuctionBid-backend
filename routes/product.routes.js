const express = require('express');
const { store, index, get, destroy, update, getTotalProducst } = require('../coontrollers/productController');
const { auth, isAuthorizedRole } = require('../middlewares/authentication')
const router = express.Router();

router.post('/',auth,isAuthorizedRole(['user','admin']),store)
router.get('/',index)
router.get('/count', getTotalProducst) 
router.get('/:id', get)
router.delete('/:id',destroy)
router.put('/:id',auth,isAuthorizedRole(['user','admin']),update)


module.exports= router 