const router = require('express').Router()
const Student = require ('../models/Student')

//create a student 

router.post('/', async(req,res) => {

   const newstudent = new Student(req.body)
   try{
    const savedstudent = await newStudent.save()
    res.status(200).json(savedstudent)
   }catch(err) {
    res.status(500).json(err)
   }
})

//UPDATE A STUDENT
router.put('/:id', async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(req.body.isadmin){
            await student.updateOne({$set: req.body})
            res.status(200).json ('thestudent has been updated')

        } else {
            res.status(403).json('you can only update student if your an admin ')
        }
    }catch(err){
        res.status(500).json(err)
    }
})
// DELETE A STUDENT
router.delete("/:id", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (req.body.isadmin) {
        await  student.deleteOne();
        res.status(200).json("the student has been deleted");
      } else {
        res.status(403).json("you cannot delete the student");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }); 
  //get a student
router.get('/:id', async(req,res)=>{
    try{
     const student= await Student.findById(req.params.id);
     res.status(200).json(student)
    }catch(err){
   res.status(500).json(err)
    }
})
//get all students
router.get("/", async (req, res) => {
  try {
  
   const  result = await Student.find()
   res.status(200).json(result)

  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports= router