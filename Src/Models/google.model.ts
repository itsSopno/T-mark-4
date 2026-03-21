import { model, Schema, type Document } from "mongoose"

export interface IGoogle extends Document {
    googleId: string;
    email: string;
    name: string;
    image: string;
}

const googleSchema: Schema<IGoogle> = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

const googleModel = model<IGoogle>("google", googleSchema)
export default googleModel