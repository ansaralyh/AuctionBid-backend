const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());

app.use(cors("*"));
const adminRoutes = require("./routes/index.routes");

app.use("/api/v1", adminRoutes);


module.exports = app;
