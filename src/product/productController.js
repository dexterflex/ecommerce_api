import ProductModel from './productModel.js';

class ProductController {
    static async getAllProducts(req, res, next) {
        try {
            const products = await ProductModel.getAllProducts();
            res.status(200).json({ message: "List of Products", products });
        } catch (error) {
            next(error);
        }
    }

    static async searchProducts(req, res, next) {
        try {
            const { query } = req.query;
            const products = await ProductModel.searchProducts(query);
            res.status(200).json({ message: "Search Results", products });
        } catch (error) {
            next(error);
        }
    }

    static async getProductById(req, res, next) {
        try {
            console.log(typeof (req.params.id));
            const product = await ProductModel.getProductById(req.params.id);

            res.status(200).json({ message: "Product by Id", product });
        } catch (error) {
            next(error);
        }
    }

    static async createProduct(req, res, next) {
        try {
            const productData = req.body;
            const newProduct = await ProductModel.createProduct(productData);
            res.status(201).json({ message: "Product Created", product: newProduct });
        } catch (error) {
            next(error);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const updatedProduct = await ProductModel.updateProduct(req.params.id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product Updated", product: updatedProduct });
        } catch (error) {
            next(error);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const deletedProduct = await ProductModel.deleteProduct(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product Deleted", product: deletedProduct });
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;
