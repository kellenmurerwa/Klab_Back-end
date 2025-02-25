import Blog from "../models/BlogModel.js";
import cloudinary  from "../config/cloudinary.js";


export const createBlog = async (req, res) => {
    console.log('cloudinary object:', cloudinary);
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const { BlogTitle,BlogDescription,BlogDate } = req.body;
        if (!req.file) return res.status(400).json({ success: false, message: "Blog image is required" });

        const newBlog = new Blog({
            BlogTitle,
            BlogDescription,
            BlogDate,
            BlogImage: result.secure_url,
             
        });

        await newBlog.save();
        res.status(201).json({ success: true, message: "Blog created successfully", blog: newBlog});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blog.findById(id);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const { BlogTitle,BlogDescription,BlogDate } = req.body;
        let updatedBlog = { BlogTitle,BlogDescription,BlogDate };

        if (req.file) {
            const blog = await blog.findById(id);
            if (blog) await cloudinary.uploader.destroy(blog.blogImage); 
            updatedBlog.blogImage = req.file.path; 
        }

        const blog = await blog.findByIdAndUpdate(id, updatedBlog, { new: true });
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        res.status(200).json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blog.findById(id);
        if (!blog) return res.status(404).json({ success: false, message: "blog not found" });

        await cloudinary.uploader.destroy(blog.blogImage); 
        await blog.deleteOne();

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
