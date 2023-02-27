const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const  mongoose  = require('mongoose');
require('dotenv').config();
//REGISTER
router.post('/register',  async(req,res)=>{
  
    try{
        //GENERATE NEEW  PASSSWORD 
        const salt = await bcrypt.genSalt(10);
        const hashedpassword =  await bcrypt.hash(req.body.password,salt)
       // CREATE NEW USER 
        const newuser = new User ({
            username: req.body.username,
            email: req.body.email,
            password : hashedpassword 
        })
    //save user and return response
    const user= await newuser.save()
    res.status(200).json(user)
    }catch(err){
    console.log(err)
 
    }
})


//LOGIN


router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
     if( !user)  {return(res.status(400).json("Wrong credentials!"))};
  
      const validate = await bcrypt.compare(req.body.password, user.password);
      if(!validate) { return ( res.status(400).json("Wrong password!"))};
     
      
      function generateAccessToken(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
      }
      
  const accessToken = generateAccessToken(user);
  res.send({
        accessToken,
    });

    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports= router