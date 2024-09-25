import express from 'express'

import CartController from './cartController.js';
import authMiddleware from "../../handlers/authMiddleware.js"

let cartRouter = express.Router()

// Get user's cart
cartRouter.get('/', authMiddleware, CartController.getCart);

// Add item to cart
cartRouter.post('/add', authMiddleware, CartController.addItemToCart);

// Update item quantity in cart
cartRouter.put('/update', authMiddleware, CartController.updateItemQuantity);

// Remove item from cart
cartRouter.delete('/remove/:productId', authMiddleware, CartController.removeItemFromCart);

// Clear entire cart
cartRouter.delete('/clear', authMiddleware, CartController.clearCart);

export default cartRouter;