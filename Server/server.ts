const express = require("express")
import {Request,Response} from "express"

const app = express()

app.get('/',(req:Request,res:Response)=>{
    res.send("Hello World")
})

app.get('/api/chat',(req:Request,res:Response)=>{
    res.send("Hello World")
})

app.get('/api/chat/:id',(req:Request,res:Response)=>{
    

app.listen(5000,console.log("Server Started on PORT 5000"))