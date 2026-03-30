import { model, Schema, type Document } from "mongoose";

export interface IUserData extends Document {
    userId: String,
    name: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    address: String,
    image: String,
    Bio: String,

}

const UserDataSchema = new Schema<IUserData>({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    Bio: {
        type: String,
        required: true
    }
})

const UserDataModel = model<IUserData>("userdata", UserDataSchema)
export default UserDataModel;