const express = require('express');
const { createEmail, getTotalEmails, getAllMails } = require('../coontrollers/emailController');

const router = express.Router();

router.post('/', createEmail);
router.get('/', getAllMails);
router.get('/count', getTotalEmails)


module.exports = router