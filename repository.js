import mongoose from "mongoose";
import { User, Product } from "./schema.js";
import { clearHash } from "./cache.js";
import('./cache.js')
export default {
    login:async (data)=>{
       return await User.findOne({name:data.name})
    },
    getProduct:async()=>{
        // here cache will store using the key
        return await Product.find().cache({key:"keyname"})
    },
    insert:async(data)=>{
        await Product.create(data)
        clearHash()
    }
}   