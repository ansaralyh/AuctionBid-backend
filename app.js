const express = require('express');
const app = express();

const adminRoutes = require('./routes/index.routes')

app.use('/api/v1',adminRoutes);

module.exports = app
