import OrderModel from './orderModel.js';

class OrderController {
    // Create a new order
    static async createOrder(req, res, next) {
        try {
            const { items, totalPrice, shippingAddress, paymentMethod } = req.body;
            const userId = req.user.id; // Assuming userId is stored in req.user from auth middleware
            const order = await OrderModel.createOrder(userId, items, totalPrice, shippingAddress, paymentMethod);
            res.status(201).send({ message: "Order created successfully", order });
        } catch (error) {
            next(error);
        }
    }

    // Get order by ID
    static async getOrderById(req, res, next) {
        try {
            const orderId = req.params.id;
            const userId = req.user.id; // Assuming userId is stored in req.user from auth middleware
            const order = await OrderModel.getOrderById(orderId, userId);
            res.status(200).send({ order });
        } catch (error) {
            next(error);
        }
    }

    // Get all orders for the logged-in user
    static async getUserOrders(req, res, next) {
        try {
            const userId = req.user.id;
            const orders = await OrderModel.getUserOrders(userId);
            res.status(200).send({ orders });
        } catch (error) {
            next(error);
        }
    }

    // Update order status (admin only)
    static async updateOrderStatus(req, res, next) {
        try {
            const orderId = req.params.id;
            const { status } = req.body;
            const order = await OrderModel.updateOrderStatus(orderId, status);
            res.status(200).send({ message: "Order status updated", order });
        } catch (error) {
            next(error);
        }
    }

    // Delete an order
    static async deleteOrder(req, res, next) {
        try {
            const orderId = req.params.id;
            const userId = req.user.id;
            const order = await OrderModel.deleteOrder(orderId, userId);
            res.status(200).send({ message: "Order deleted successfully", order });
        } catch (error) {
            next(error);
        }
    }
}

export default OrderController;
