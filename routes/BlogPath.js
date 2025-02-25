import { createBlog, getAllBlogs, getBlogById,deleteBlogById, updateBlogById} from "../Controllers/blogController.js";
import upload from "../middlewares/Multer.js";
import express from 'express';
const blogRouter = express.Router();

blogRouter.post('/createBlog', upload.single("BlogImage") ,createBlog);
blogRouter.get('/getAllBlogs', getAllBlogs);
blogRouter.get('/getBlogById/:id', getBlogById);
blogRouter.delete('/deleteBlogById/:id', deleteBlogById);
blogRouter.put('/updateBlogById/:id', upload.single("BlogImage"),updateBlogById);
export default blogRouter;
