import mongoose from 'mongoose';

const blogServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const BlogService = mongoose.model('BlogService', blogServiceSchema);
export default BlogService;
