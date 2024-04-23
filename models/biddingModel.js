const mongoose = require('mongoose')
const bidSchema = new mongoose.Schema({
    bid_price : {
        type:String
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    date:{  
        type:Date
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})
module.exports = mongoose.model('bidding-model',bidSchema)