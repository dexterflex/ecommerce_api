import express from 'express';
import OrderController from './orderController.js';
import authMiddleware, { isAdmin } from '../../handlers/authMiddleware.js' // To protect routes

const orderRouter = express.Router();

// Create a new order (requires authentication)
orderRouter.post('/create', authMiddleware, OrderController.createOrder);

// Get a specific order by ID (requires authentication)
orderRouter.get('/:id', authMiddleware, OrderController.getOrderById);

// Get all orders for the logged-in user (requires authentication)
orderRouter.get('/', authMiddleware, OrderController.getUserOrders);

// Update order status (admin only)
orderRouter.patch('/:id/status', isAdmin, OrderController.updateOrderStatus);

// Delete an order (requires authentication)
orderRouter.delete('/:id', authMiddleware, OrderController.deleteOrder);

export default orderRouter;
