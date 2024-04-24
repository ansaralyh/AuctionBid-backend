const mongoose = require('mongoose');
const produSchema = new mongoose.Schema({
    category:{
        type: String,
        enum : ['Vehicles',"Jewelery",'Real Estate']
    },
    title:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    date:{
        type:Date,
    }
})


module.exports = mongoose.model("products",produSchema)