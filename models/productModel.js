const mongoose = require('mongoose');
const produSchema = new mongoose.Schema({
    title:{
        type: String,
        enum : ['vehicle',"jewelry",'real estate']
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
    
    
})
module.exports = mongoose.model("products",produSchema)