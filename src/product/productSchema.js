import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be less than 0'],
        default: 0,
    },
    images:
    {
        type: [String],
        required: [true, 'At least one product image is required'],
    }
    ,
    size: {
        type: [String], // Array of sizes
        required: false, // Optional, if some products do not have size variations
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], // Example for clothing sizes
        default: undefined
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
