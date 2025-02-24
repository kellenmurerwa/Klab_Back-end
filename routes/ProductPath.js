import { createProduct, getAllProducts, getProductById,deleteProductById, updateProductById} from "../Controllers/productController.js";
import { upload } from "../config/cloudinary.js";
import express from 'express';
const productRouter = express.Router();

productRouter.post('/createProduct', upload.single("productImage") ,createProduct);
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getProductById/:id', getProductById);
productRouter.delete('/deleteProductById/:id', deleteProductById);
productRouter.put('/updateProductById/:id', upload.single("productImage"),updateProductById);
export default productRouter;

