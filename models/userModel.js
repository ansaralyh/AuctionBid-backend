const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['vehicle', 'jewelry', 'real estate']
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
  
});

module.exports = mongoose.model("users", productSchema);
