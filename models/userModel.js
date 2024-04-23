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
    password:{
        type:String,
        required:true
    },
    phone: {
        type: Number,
        required: true
    },
    cnic: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['user',"admin"],
        default: "user"
    }
})

module.exports = mongoose.model("users", productSchema);
