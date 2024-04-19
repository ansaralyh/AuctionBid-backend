const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const fileUpload  = require('express-fileupload');

app.use(express.json());
app.use(bodyParser.json());

app.use(cors("*"));

// file uplaod
app.use(fileUpload());

// Serve static files from the 'uploads' directory
app.use(express.static("uploads/"))


const adminRoutes = require("./routes/index.routes");

app.use("/api/v1", adminRoutes);


module.exports = app;
