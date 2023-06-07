import express from 'express'
import { Dbconnect } from './connection.js'
import repo from './repository.js'
const app = express()
app.use(express.json())
Dbconnect()

app.post('/login',async(req,res)=>{
    let user =await repo.login(req.body)
    if(user){
    let product =await repo.getProduct()
    res.send(product)
    }else{
        res.send('invalid user or password')
    }
})

app.post('/insert',(req,res)=>{
    repo.insert(req.body).then((resp)=>{
        res.send(resp)
    })
})



app.listen(3000,()=>{
    console.log("server is running");
})   