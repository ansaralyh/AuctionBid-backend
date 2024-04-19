const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());

app.use(cors("*"));
const adminRoutes = require("./routes/index.routes");
const contactRoutes = require("./routes/contact.routes")
const userRoutes = require("./routes/user.routes")
// const productRoutes = require("./routes/product.routes")

app.use("/api/v1", adminRoutes);
app.use("/api/v1", contactRoutes);
app.use("/api/v1", userRoutes)
// app.use("/api/v1", productRoutes)


module.exports = app;
