const express = require('express');
const { createContact, getAllContact, getTotalContacts, deleteContact } = require('../coontrollers/contactController');

const router = express.Router();

router.post('/', createContact);
router.get('/', getAllContact);
router.get('/count', getTotalContacts);
router.delete('/:id', deleteContact);




module.exports = router