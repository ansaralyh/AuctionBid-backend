const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require("fs");
const path = require("path");

exports.store = catchAsyncErrors(async (req, res, next) => {
    const { title, price, description ,category } = req.body;
    const { image } = req.files;

    if (!title || !price || !description || !category) {
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

   
        const result = await Product.create({
            title,
            description,
            price,
            image: imageUrl,
            category
        });
        
        res.status(201).json({
            message: 'Operation successful',
            result
        });
    
});

//Get all products
exports.index = catchAsyncErrors(async(req,res,next) =>{
    let query = {};
    if (req.query.category) {
        query.category = req.query.category;
      }
      if (req.query.status) {
        query.status = req.query.status;
      }
    const products = await Product.find(query)
    if(!products){
        return next(new ErrorHandler("Products not found"))
    }
    res.status(200).json({
        success:true,
        result:products,
        
    })
    
})


// get single product

exports.get = catchAsyncErrors(async(req,res,next) =>{
    const product = req.params.id;
    const requiredProduct = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found"))
    }
    res.status(200).json({
        success:true,
        result:requiredProduct
    })
})

// delete product
exports.destroy = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
        return next(new ErrorHandler("Product not found", 404));
    }
    
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});


// update the product
exports.update = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const { title, price, description } = req.body;

    if (!title || !price || !description) {
        return next(new ErrorHandler("Fields missing", 400));
    }

    let imageUrl;
    if (req.files && req.files.image) {
        const image = req.files.image;
        const uploadFolderPath = path.join(__dirname, "../uploads");

        const product = await Product.findById(productId);

        if (product && product.image) {
            const previousImagePath = path.join(uploadFolderPath, path.basename(product.image));
            fs.unlinkSync(previousImagePath);
        }

        const fileName = image.name;
        const imagePath = path.join(uploadFolderPath, fileName);
        await image.mv(imagePath);
        imageUrl = `${req.protocol}://${req.get("host")}/${fileName}`;
    }

    const updatedData = {
        title,
        price,
        description
    };

    if (imageUrl) {
        updatedData.image = imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!updatedProduct) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        result: updatedProduct
    });
});



