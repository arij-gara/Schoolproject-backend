const router =require('express').Router()
const User = require('../models/User')

//update user
router.put('/:id', async(req,res)=>{
    if (req.body.userId === req.params.id || req.body.isadmin){
        if(req.body.password){
            try{
           const salt = await bcrypt.genSalt(10)
           req.body.password = await bcrypt.hash(req.body.password,salt)
            }catch(err){
       return res.status(500).json(err)
            }

        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body})
            res.status(200).json('account has been updated')
        }catch(err){
            console.log(err)
        }
    }
})
//delete user 
router.delete('/:id', async(req,res) =>{
    if( req.body.userId === req.params.id  || req.body.isadmin) {
     try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(' accoount has been deleted')
     }catch(err){
       return res.status(500).json(err)
     }
    } else{
        return  res.status(403).json(" you can delete only your account ")
    }
   
})
//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
  
    try {
      
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports= router