import express from 'express'

import authMiddleware, { isAdmin } from '../../handlers/authMiddleware.js';
import ProductController from './productController.js'

let productRouter = express.Router();

// get routes 
productRouter.get('/', ProductController.getAllProducts);  // Get all products
productRouter.get('/search', ProductController.searchProducts);    // Search products
productRouter.get('/:id', ProductController.getProductById);   // Get product by ID

// post routes 
productRouter.post('/', isAdmin, ProductController.createProduct);  // Create new product (admin only)

// put routes 
productRouter.put('/:id', isAdmin, ProductController.updateProduct);    // Update product (admin only)

// delete routes
productRouter.delete('/:id', isAdmin, ProductController.deleteProduct); // Delete product (admin only)



export default productRouter;