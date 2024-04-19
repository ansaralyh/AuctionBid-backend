const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require("fs");
const path = require("path");

exports.store = catchAsyncErrors(async (req, res, next) => {
    const { title, price, description } = req.body;
    const { image } = req.files;

    if (!title || !price || !description) {
        return next(new ErrorHandler("Fields missing", 400));
    }

    const uploadFolderPath = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath, { recursive: true });
    }

    const fileName = image.name;
    const imagePath = path.join(uploadFolderPath, fileName);

    await image.mv(imagePath);


    const imageUrl = `${req.protocol}://${req.get("host")}/${fileName}`;

    try {
        const result = await Product.create({
            title,
            description,
            price,
            image: imageUrl
        });

        res.status(201).json({
            message: 'Operation successful',
            result
        });
    } catch (error) {
        return next(new ErrorHandler("Error storing product details", 500));
    }
});
