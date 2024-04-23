const Review = require('../models/reviewModel')

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


// get total number of reviews

exports.getTotalReviews = async (req, res) => {
    try {
      const totalReviews = await Review.countDocuments();
      res.status(200).json({ total: totalReviews });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };