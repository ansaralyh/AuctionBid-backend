const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const BidModel = require('../models/biddingModel');
const Product = require('../models/productModel');



exports.biddingOnProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const { bid_price, product, user_id } = req.body;

        if (!bid_price || !product || !user_id) {
            return next (new ErrorHandler('Bid price, product ID, and user ID are required', 400))
        }

        const productDetails = await Product.findById(product);
        const highestBid = await BidModel.findOne({ product }).sort({ bid_price: -1 });
        if (!productDetails) {
            return next(new ErrorHandler('Product not found', 404));
        }else if(parseFloat(bid_price) <= parseFloat(productDetails.price)){
            res.status(400).json({
                message:'Bid price must be greater than the product price'
            })
        }else if(highestBid && parseFloat(bid_price) <= parseFloat(highestBid.bid_price)){
            res.status(400).json({
                message:'Bid price must be greater than all previous bids'
            })
        }else{
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
        }


        
    } catch (error) {
        res.status(500).json(error)
    }
});


exports.getHighestBid = catchAsyncErrors(async (req, res, next) => {
    try {
        const highestBid = await BidModel.findOne().sort({ bid_price: -1 }).populate('product user_id owner');

        if (!highestBid) {
            return new ErrorHandler('No highest bid found', 404);
        }

        res.status(200).json({
            success: true,
            highestBid
        });
    } catch (error) {
        next(error);
    }
});

exports.totalBids = catchAsyncErrors(async (req,res,next)=>{
    const totalBids = await BidModel.countDocuments();
    console.log(totalBids)
    res.status(200).json({
        success:true,
        totalBids
    })
})

exports.getProductBids = catchAsyncErrors(async (req,res,next)=>{
    const bids = await BidModel.find({product:req.params.id}).populate('user_id')
    res.status(200).json({
        success:true,
        bids
    })
})