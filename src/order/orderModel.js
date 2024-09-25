import Order from './orderSchema.js';
import ApplicationError from '../../handlers/applicationErrorHandler.js';

class OrderModel {
    // Create a new order
    static async createOrder(userId, items, totalPrice, shippingAddress, paymentMethod) {
        try {
            const newOrder = new Order({
                user: userId,
                items,
                totalPrice,
                shippingAddress,
                paymentMethod
            });
            await newOrder.save();
            return newOrder;
        } catch (error) {
            throw new ApplicationError(500, "Failed to create order");
        }
    }

    // Get order by ID
    static async getOrderById(orderId, userId) {
        try {
            const order = await Order.findOne({ _id: orderId, user: userId }).populate('items.product', 'name price');
            if (!order) throw new ApplicationError(404, "Order not found");
            return order;
        } catch (error) {
            throw new ApplicationError(error.status || 500, error.message || "Failed to retrieve order");
        }
    }

    // Get all orders for a user
    static async getUserOrders(userId) {
        try {
            const orders = await Order.find({ user: userId }).populate('items.product', 'name price');
            return orders;
        } catch (error) {
            throw new ApplicationError(500, "Failed to retrieve orders");
        }
    }

    // Update order status
    static async updateOrderStatus(orderId, status) {
        try {
            const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
            if (!order) throw new ApplicationError(404, "Order not found");
            return order;
        } catch (error) {
            throw new ApplicationError(500, "Failed to update order status");
        }
    }

    // Delete an order
    static async deleteOrder(orderId, userId) {
        try {
            const order = await Order.findOneAndDelete({ _id: orderId, user: userId });
            if (!order) throw new ApplicationError(404, "Order not found");
            return order;
        } catch (error) {
            throw new ApplicationError(500, "Failed to delete order");
        }
    }
}

export default OrderModel;
