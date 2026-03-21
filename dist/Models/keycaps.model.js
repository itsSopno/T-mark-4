import { Schema, Document, model } from "mongoose";
const keyCapsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    }
});
const KeycapsModel = model("keycaps", keyCapsSchema);
export default KeycapsModel;
//# sourceMappingURL=keycaps.model.js.map