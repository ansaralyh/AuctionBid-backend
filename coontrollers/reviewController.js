const Review = require('../models/reviewModel')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.createReview = async (req, res) => {
    try {
        const {name, message} = req.body;
        const newReview = new Review({name, message});
        await newReview.save();
        res.status(201).json(newReview)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


//Get all products
exports.getAllReviews = catchAsyncErrors(async(req,res,next) =>{
  const reviews = await Review.find();
  if(!reviews){
      return next(new ErrorHandler("Products not found"))
  }
  res.status(200).json({
      success:true,
      result:reviews
  })
})



// get single review

exports.getSingleReview = catchAsyncErrors(async(req,res,next) =>{
  const Review = req.params.id;
  const requiredReview = await Review.findById(req.params.id);
  if(!Review){
      return next(new ErrorHandler("Product not found"))
  }
  res.status(200).json({
      success:true,
      result:requiredReview
  })
})


// get total number of reviews

exports.getTotalReviews = async (req, res) => {
    try {
      const totalReviews = await Review.countDocuments();
      res.status(200).json({ total: totalReviews });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };