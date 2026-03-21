import { Schema, model, Document } from "mongoose";
const keyboardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 199
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 100
    },
    category: {
        type: String,
        required: true,
        default: "Keyboards"
    },
    brand: {
        type: String,
        required: true,
        default: "Tech Gear"
    },
    layout: {
        type: String,
        default: "75%"
    },
    switchType: {
        type: String,
        default: "Mechanical"
    },
    description: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
});
const keyboardModel = model("keyboard", keyboardSchema);
export default keyboardModel;
//# sourceMappingURL=keyboard.model.js.map