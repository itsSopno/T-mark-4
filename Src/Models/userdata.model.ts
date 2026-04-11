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
    googleId:String,
    coverImage:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    settings:{
        type:Object,
       default:{
        theme:"dark",
        notifications:{
            email:true,
            push:true,
            sms:true
        },
        privacy:{
            profileVisibility:"public",
            messageRequests:true,
          
        }
       }
    },
    friends:{
        type:[string],
        default:[],
    },
    friendRequests:{
        from : [string],
        status:{
            type:string,
            enum:['pending','accepted','rejected'],
            default:'pending'
        }
    },
    createdAt:{
        type:Date,
    },
    updatedAt:{
        type:Date,
    }

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
    },
    googleId: {
        type: String,
        required: false
    },
    coverImage: {
        type: String,
        required: false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

const UserDataModel = model<IUserData>("userdata", UserDataSchema)
export default UserDataModel;