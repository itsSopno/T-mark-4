import type { Document, Schema, model } from "mongoose"

const MyGirlSchema = new Schema({
    name: String,
    age: Number,
    image: String,
    bio: String,
    hooby: String,
    fbAccount: String,
    instaAccount: String,
    hobby: String,

})