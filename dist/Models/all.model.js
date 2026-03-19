import { Document, model, Schema } from "mongoose";
const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    stock: {
        type: String,
        require: true
    }
});
const productModel = model("product", ProductSchema);
export default productModel;
//# sourceMappingURL=all.model.js.map