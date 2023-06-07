const mongoose = require(`mongoose`)
const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:[true , "Please Provide Unique UserName"],
        unique:[true , `userName Exist`]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    gender:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:`user`
    },
    firstName:{type:String},
    LastName:{type:String},
    adress:{type:String},
    profile:{type:String}
})
module.exports = mongoose.model(`User` , userSchema)