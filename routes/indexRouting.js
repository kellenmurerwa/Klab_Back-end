import express from 'express';
import productRouter from './ProductPath.js';

const mainRouter= express.Router();
mainRouter.use('/product', productRouter);

export default mainRouter;