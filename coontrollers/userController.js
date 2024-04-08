const User = require('../models/userModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bcrypt = require("bcryptjs");

exports.store = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Fields missing"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User creation failed",
            error: error.message
        });
    }
});
