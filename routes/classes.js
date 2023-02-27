const router = require('express').Router()
const Class = require('../models/Class')


//Create a class
router.post('/', async (req,res) =>{

    const newclass = new Class(req.body)
    try{
        const savedclass = await  newclass.save()
        res.status(200).json(savedclass)
    }catch(err){
        res.status(500).json(err)
    }
    
})
//update a class
router.put('/:id', async(req,res)=>{
    try{
        const newclass = await Class.findById(req.params.id);
        if(req.body.isadmin){
            await newclass.updateOne({$set: req.body})
            res.status(200).json ('the class has been updated')

        } else {
            res.status(403).json('you can update the class only if you are the admin ')
        }
    }catch(err){
        res.status(500).json(err)
    }
})

// delete a class
router.delete("/:id", async (req, res) => {
  try {
    const newclass = await Class.findById(req.params.id);
    if (req.body.isadmin) {
      await newclass.deleteOne();
      res.status(200).json("the class has been deleted");
    } else {
      res.status(403).json("only admin can delete a class");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}); 
//get a class
router.get('/:id', async(req,res)=>{
    try{
     const newclass= await Class.findById(req.params.id);
     res.status(200).json(newclass)
    }catch(err){
   res.status(500).json(err)
    }
})
//get all classes
router.get("/", async (req, res) => {
  try {
  
   const  result = await Class.find()
   res.status(200).json(result)

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports= router