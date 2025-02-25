import Product from "../models/ProductModel.js";
import cloudinary  from "../config/cloudinary.js";


export const createProduct = async (req, res) => {
    console.log('cloudinary object:', cloudinary);
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const { productName, productPrice, productCategory, productDiscount } = req.body;
        if (!req.file) return res.status(400).json({ success: false, message: "Product image is required" });

        const newProduct = new Product({
            productName,
            productPrice,
            productCategory,
            productDiscount,
            productImage: result.secure_url,
             
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productPrice, productCategory, productDiscount } = req.body;
        let updatedProduct = { productName, productPrice, productCategory, productDiscount };

        if (req.file) {
            const product = await Product.findById(id);
            if (product) await cloudinary.uploader.destroy(product.productImage); 
            updatedProduct.productImage = req.file.path; 
        }

        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        await cloudinary.uploader.destroy(product.productImage); 
        await product.deleteOne();

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
