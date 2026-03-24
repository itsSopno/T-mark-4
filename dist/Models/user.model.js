import mongoose, { Schema, Document, Model } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Name is required"]
    },
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true,
});
const userModel = mongoose.model("user", userSchema);
export default userModel;
//# sourceMappingURL=user.model.js.map