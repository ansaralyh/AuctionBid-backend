const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },   
    email: {
        type: String,
        required: true
    },
  
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

module.exports = mongoose.model("users",userSchema)