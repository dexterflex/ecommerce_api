import Cart from './cartSchema.js';
import Product from '../product/productSchema.js'
import ApplicationError from '../../handlers/applicationErrorHandler.js';

class CartModel {
    static async getCartByUserId(userId) {
        try {
            let cart = await Cart.findOne({ user: userId }).populate('items.product');
            return cart || { items: [], totalPrice: 0 };
        } catch (error) {
            throw new ApplicationError(error.status || 500, error.message || "Failed to retrieve cart");
        }
    }

    static async addItem(userId, productId, quantity) {
        try {
            let product = await Product.findById(productId);
            if (!product) throw new ApplicationError(404, "Product not found");

            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                cart = new Cart({ user: userId, items: [], totalPrice: 0 });
            }

            const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            cart.totalPrice += product.price * quantity;
            await cart.save();

            return cart;
        } catch (error) {
            throw new ApplicationError(error.status || 500, error.message || "Failed to add item to cart");
        }
    }

    static async updateItemQuantity(userId, productId, quantity) {
        try {
            let cart = await Cart.findOne({ user: userId }).populate('items.product', 'price');
            if (!cart) throw new ApplicationError(404, "Cart not found");

            const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                throw new ApplicationError(404, "Product not found in cart");
            }

            cart.calculateTotalPrice();
            await cart.save();

            return cart;
        } catch (error) {
            throw new ApplicationError(error.status || 500, error.message || "Failed to update item quantity");
        }
    }

    static async removeItem(userId, productId) {
        try {
            let cart = await Cart.findOne({ user: userId });
            if (!cart) throw new ApplicationError(404, "Cart not found");

            cart.items = cart.items.filter(item => !item.product.equals(productId));

            cart.calculateTotalPrice();
            await cart.save();

            return cart;
        } catch (error) {
            throw new ApplicationError(error.status || 500, error.message || "Failed to remove item from cart");
        }
    }

    static async clearCart(userId) {
        try {
            let cart = await Cart.findOne({ user: userId });

            if (cart) {
                cart.items = [];
                cart.totalPrice = 0;
                await cart.save();
            }

            return cart;
        } catch (error) {
            throw new ApplicationError(error.status || 500, error.message || "Failed to clear cart");
        }
    }
}

export default CartModel;
