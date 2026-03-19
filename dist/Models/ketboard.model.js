import { Schema, model, Document } from "mongoose";
const keyboardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    switchType: {
        type: String,
        required: true,
    },
    layout: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }
});
const keyboardModel = model("keyboard", keyboardSchema);
export default keyboardModel;
//# sourceMappingURL=ketboard.model.js.map