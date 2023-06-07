import mongoose from 'mongoose'

export const Dbconnect =async () => {
    await mongoose.connect('mongodb://localhost:27017/redis_test')
    .then(()=>{  
        console.log("connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}