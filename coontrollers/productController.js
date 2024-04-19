const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require("fs");
const path = require("path");

exports.store = catchAsyncErrors(async (req, res, next) => {
    const { title, price, description } = req.body;
    const { image } = req.files;

    // Check if required fields are missing
    if (!title || !price || !description) {
        return next(new ErrorHandler("Fields missing", 400));
    }

    // Prepare folder for file upload
    const uploadFolderPath = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath, { recursive: true });
    }

    // Extract file details
    const fileName = image.name;
    const imagePath = path.join(uploadFolderPath, fileName);

    // Move uploaded image to specified folder
    await image.mv(imagePath);

    // Construct image URL
    const imageUrl = `${req.protocol}://${req.get("host")}/${fileName}`;

    try {
        // Create new product entry in the database
        const result = await Product.create({
            title,
            description,
            price,
            image: imageUrl
        });

        // Send success response
        res.status(201).json({
            message: 'Operation successful',
            result
        });
    } catch (error) {
        // Handle database error
        return next(new ErrorHandler("Error storing product details", 500));
    }
});
