const express = require('express');
const { createEmail, getTotalEmails } = require('../coontrollers/emailController');

const router = express.Router();

router.post('/', createEmail);
router.get('/count', getTotalEmails)


module.exports = router