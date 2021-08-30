const Joi = require("joi")
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const config = require("config")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        maxlength:255,
        minlength:5,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:7
    },
    isAdmin:Boolean
});

userSchema.methods.genereteAuthToken = function () {
   const token = jwt.sign({_id: this._id , isAdmin : this.isAdmin},config.get("jwtPrivateKey"))
   return token ;
}
const User = mongoose.model("Users", userSchema)

function validateUser(user){
    const schema ={
        username: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required(),
        isAdmin:Joi.boolean().required()
    }

    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validateUser;