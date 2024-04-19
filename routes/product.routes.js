const express = require('express');
const { store, index, get, destroy, update } = require('../coontrollers/productController');
const { auth, isAuthorizedRole } = require('../middlewares/authentication')
const router = express.Router();

router.post('/',auth,isAuthorizedRole(['user','admin']),store)
router.get('/',auth,isAuthorizedRole(['user','admin']),index) 
router.get('/:id',auth,isAuthorizedRole(['user','admin']),get)
router.delete('/:id',auth,isAuthorizedRole(['user','admin']),destroy)
router.put('/:id',auth,isAuthorizedRole(['user','admin']),update)


module.exports= router