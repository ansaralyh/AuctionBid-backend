const User = require('../models/userModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);


exports.store = catchAsyncErrors(async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const result = await users.create(req.body);
    res.status(200).json({
      success: true,
      messege: "User created successfully",
    });
  });