import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
{
  question:{
    type:String,
    required:true
  },
  answer:{
    type:String,
    required:true
  },
  page: {
  type: String,
  enum: ["home", "service"],
  required: true,
}
},
{
  timestamps:true
}
);

const FAQ = mongoose.model("FAQ", faqSchema);

export default FAQ;