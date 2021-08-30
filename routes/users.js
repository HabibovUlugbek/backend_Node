const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {User , validate } = require("../models/user")
const _ = require("lodash")
const auth = require("../middleware/auth")


router.get('/me' , auth, async(req,res) => {
 const user = await User.findById(req.user._id).select("-password")
 res.send(user)
})

router.post('/' , async(req,res) => {
 const {error} = validate(req.body)
 if (error)
 return res.status(400).send(error.details[0].message);

 let user = await User.findOne({email:req.body.email})
    if(user) 
    return res.status(400).send("Mavjud bo`lgan foydalanuvchi")

    
  user = new User(
    _.pick(req.body,["username", "email", "password", "isAdmin"])
  );

  const salt  = await bcrypt.genSalt()
  user.password = await bcrypt.hash(user.password , salt)
  user = await user.save();

  res.send(_.pick(user, ["username", "email","isAdmin"]));

})

module.exports = router; 