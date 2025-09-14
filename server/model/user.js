const mongoose = require('mongoose')

const  userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true ,
        unique : true,
        trim : true 
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user','admin'],  // only allow user and admin roles
        default: 'user'
    },

 },{timestamps : true}) //timestamps automatically add two fields to your document  " {createdAt, updatedAt}"
                        
 module.exports = mongoose.model("user",userSchema)