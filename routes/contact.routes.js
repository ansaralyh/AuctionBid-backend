const express = require('express');
const { createContact, getAllContact, getTotalContacts } = require('../coontrollers/contactController');

const router = express.Router();

router.post('/', createContact);
router.get('/', getAllContact);
router.get('/count', getTotalContacts);



module.exports = router