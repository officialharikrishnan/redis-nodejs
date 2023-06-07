import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:String,
    password:String
})
const producutSchema = mongoose.Schema({
    name:String,
    price:Number,
    about:String
})

export const User = mongoose.model('users',userSchema)
export const Product = mongoose.model('products',producutSchema)