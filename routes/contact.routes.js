const express = require('express');
const { createContact, getAllContact } = require('../coontrollers/contactController');

const router = express.Router();

router.post('/contact', createContact);
router.get('/contacts', getAllContact);


module.exports = router