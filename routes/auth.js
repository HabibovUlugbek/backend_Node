const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const Joi = require("joi")
const {User } = require("../models/user")
const _ = require("lodash")

router.post('/' , async(req,res) => {
 const {error} = validate(req.body)
 if (error)
 return res.status(400).send(error.details[0].message);

 let user = await User.findOne({email:req.body.email})
    if(!user) 
    return res.status(400).send("email yoki parol xato")

const isValidPassword = await bcrypt.compare(req.body.password, user.password)
if(!isValidPassword) 
    return res.status(400).send("email yoki parol xato")

    const token = user.genereteAuthToken()
    res.header('x-auth-token' , token ).send(true)
})

function validate(user){
    const schema ={
       
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required()
    }

    return Joi.validate(user, schema)
}

module.exports = router; 