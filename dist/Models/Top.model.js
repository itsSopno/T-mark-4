import { Document, Schema, Model, model } from "mongoose";
const TopProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    tag: { type: String, required: false },
});
export const TopProduct = model("TopProduct", TopProductSchema);
//# sourceMappingURL=Top.model.js.map