import express from "express";
import FAQ from "../models/Faq.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();


// GET ALL FAQ
router.get("/", async(req,res)=>{
 try{
   const faqs = await FAQ.find().sort({createdAt:-1});
   res.json(faqs);
 }
 catch(err){
   res.status(500).json({
    error:"Failed to fetch FAQ"
   });
 }
});


// ADD FAQ
router.post("/", verifyToken, async(req,res)=>{
 try{

 const {question,answer}=req.body;

 const faq = new FAQ({
   question,
   answer
 });

 await faq.save();

 res.status(201).json({
   message:"FAQ added",
   faq
 });

 }
 catch(err){
  res.status(500).json({
   error:err.message
  });
 }
});



// UPDATE FAQ
router.put("/:id",verifyToken,async(req,res)=>{

try{

 const faq = await FAQ.findByIdAndUpdate(
 req.params.id,
 {
  question:req.body.question,
  answer:req.body.answer,
  updatedAt:new Date()
 },
 {new:true}
 );


 res.json({
  message:"FAQ updated",
  faq
 });

}
catch(err){
 res.status(500).json({
 error:err.message
 });
}

});



// DELETE FAQ
router.delete("/:id",verifyToken,async(req,res)=>{

try{

await FAQ.findByIdAndDelete(req.params.id);

res.json({
 message:"FAQ deleted"
});

}
catch(err){
res.status(500).json({
error:err.message
});
}

});


export default router;