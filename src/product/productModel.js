import ApplicationError from "../../handlers/applicationErrorHandler.js";
import Product from "./productSchema.js";

class ProductModel {
    static async getAllProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw new ApplicationError(400, "Failed to Fetch Products");
        }
    }

    static async searchProducts(query) {
        try {
            return await Product.find({
                $text: { $search: query }
            }); // Example: searching by name with regex
        } catch (error) {
            throw new ApplicationError(400, error.message || "Failed to Search Products");
        }
    }

    static async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw new ApplicationError(404, "Product Not Found");
        }
    }

    static async createProduct(productData) {
        try {
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw new ApplicationError(400, error.message || "Failed to Create Product");
        }
    }

    static async updateProduct(id, productData) {
        try {
            return await Product.findByIdAndUpdate(id, productData, { new: true });
        } catch (error) {
            throw new ApplicationError(400, error.message || "Failed to Update Product");
        }
    }

    static async deleteProduct(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new ApplicationError(400, error.message || "Failed to Delete Product");
        }
    }
}

export default ProductModel;
