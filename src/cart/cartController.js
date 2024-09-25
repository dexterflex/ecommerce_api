import CartModel from './cartModel.js';
import ApplicationError from '../../handlers/applicationErrorHandler.js';

class CartController {
    static async getCart(req, res, next) {
        try {
            let cart = await CartModel.getCartByUserId(req.user.id);
            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    static async addItemToCart(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            let cart = await CartModel.addItem(req.user.id, productId, Number(quantity));
            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    static async updateItemQuantity(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            let cart = await CartModel.updateItemQuantity(req.user.id, productId, Number(quantity));
            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    static async removeItemFromCart(req, res, next) {
        try {
            const { productId } = req.params;
            let cart = await CartModel.removeItem(req.user.id, productId);
            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    static async clearCart(req, res, next) {
        try {
            await CartModel.clearCart(req.user.id);
            res.status(200).send({ message: "Cart cleared successfully" });
        } catch (error) {
            next(new ApplicationError(500, "Failed to clear cart"));
        }
    }
}

export default CartController;
