import mongoose, { Schema, Document, Model } from "mongoose";
const blackListSchema = new Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added in blacklist"]
    }
}, {
    timestamps: true
});
const tokenBlacklistModel = mongoose.model("BLACKLIST", blackListSchema);
export default tokenBlacklistModel;
//# sourceMappingURL=Blacklist.model.js.map