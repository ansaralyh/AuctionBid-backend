const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const BidModel = require('../models/biddingModel');
const Product = require('../models/productModel');



exports.biddingOnProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const { bid_price, product, user_id } = req.body;

        if (!bid_price || !product || !user_id) {
            throw new ErrorHandler('Bid price, product ID, and user ID are required', 400);
        }

        const productDetails = await Product.findById(product);
        if (!productDetails) {
            throw new ErrorHandler('Product not found', 404);
        }

        if (parseFloat(bid_price) <= parseFloat(productDetails.price)) {
            throw new ErrorHandler('Bid price must be greater than the product price', 400);
        }

        const highestBid = await BidModel.findOne({ product }).sort({ bid_price: -1 });

        if (highestBid && parseFloat(bid_price) <= parseFloat(highestBid.bid_price)) {
            throw new ErrorHandler('Bid price must be greater than all previous bids', 400);
        }

        const newBid = new BidModel({
            bid_price,
            product,
            user_id,
            date: new Date(),
            owner: req.user._id 
        });

        await newBid.save();

        const populatedBid = await BidModel.findById(newBid._id).populate('product user_id owner');

        res.status(201).json({
            success: true,
            message: 'Bid placed successfully',
            bid: populatedBid
        });
    } catch (error) {
        next(error);
    }
});