const User = require('../models/userModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

var salt = bcrypt.genSaltSync(10);

exports.store = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Fields missing"
        });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

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

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide an email and password", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }
    
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role:user.role
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    
    res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token
    });
});

