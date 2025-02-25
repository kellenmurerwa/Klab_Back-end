import mongoose from "mongoose";
const {model, Schema} = mongoose;

const BlogSchema = new Schema({
  BlogTitle: { type: String, required: true },
  BlogDescription: { type: String, required: true },
  BlogDate: { type: String, required: true },
  BlogImage: { type: String, required: true }, 
});

const Blog = model("Blog", BlogSchema)
export default Blog;
