import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.items.reduce((total, item) => {
        return total + item.quantity * item.product.price; // Assuming 'product.price' is populated
    }, 0);
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
