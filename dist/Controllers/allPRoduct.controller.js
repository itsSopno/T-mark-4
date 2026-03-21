import productModel from "../Models/all.model.js";
/**
 * @name CreateAllProductController
 * @desc for all product
 * @access public
 */
export const CreateAllProductController = async (req, res) => {
    try {
        const { name, price, image, stock, description, category, brand, } = req.body;
        if (!name || !price || !image || !stock || !description || !category || !brand) {
            return res.status(201).json({ message: "Nothing posted" });
        }
        const product = await productModel.create({
            name,
            price,
            stock,
            image,
            description,
            brand,
            category,
        });
        return res.status(201).json({
            message: "Product posted successfully",
            products: product
        });
    }
    catch (error) {
        return res.status(500).json({ message: "IT HAVE PROBLEM" });
    }
};
/**
 * @name getallProduct
 * @desc get all product from here
 * @access public
 */
export const getAllProduct = async (req, res) => {
    try {
        const { category, brand, searchTerm } = req.query;
        let query = {};
        if (category)
            query.category = category;
        if (brand)
            query.brand = brand;
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        const products = await productModel.find(query).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};
/**
 * @name getSingleProductController
 * @desc for every single product
 * @access Public
 */
export const getSingleProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            success: true,
            product
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Invalid ID or Server Error", error: error.message });
    }
};
//# sourceMappingURL=allProduct.controller.js.map