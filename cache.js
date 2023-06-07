import mongoose from "mongoose";
import redis from "redis";
import {promisify} from "util";
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.on('error', err => console.log('Redis Client Error', err));
client.connect().then(()=>{
    console.log("connected client");
})


const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache=function(option = {}){
    this.useCashe=true
    this.hashKey=JSON.stringify(option.key || '')
    return this
}
mongoose.Query.prototype.exec = async function () {
  // generating a key
  if(!this.useCashe){
    return exec.apply(this, arguments)
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  const value = await client.hGet(this.hashKey,key)
  if(value){
    console.log("from cache");
      const doc = JSON.parse(value)
      return Array.isArray(doc) ? doc.map(d => this.model(d)) : this.model(doc)
  }
  const result =await exec.apply(this, arguments);
  console.log('from db');
  client.hSet(this.hashKey,key,JSON.stringify(result))
  return result
};

export function clearHash(){
    // here we want to give key | i am giving an id because there is only one user for test
    client.del(JSON.stringify("hari"))
}  