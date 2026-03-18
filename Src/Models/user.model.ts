import mongoose, { Schema, Document, Model } from "mongoose"
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;

}
const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Name is required"]

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
})

const userModel: Model<IUser> = mongoose.model<IUser>("user", userSchema)
export default userModel