import express = require("express")
import {Request,Response} from "express"
import * as passport from 'passport'
const app = express()
const dotenv = require('dotenv');
dotenv.config()



const PORT = process.env.PORT || 8000


require("./auth");


app.get('/',(req:Request,res:Response)=>{
    res.send('Hello WORLD <a href="/auth/google">Login with Google</a>')
})
app.get('/auth/google',(req:Request,res:Response)=>{
    passport.authenticate('google',{scope:['profile','email']})
})

app.get('/protected',(req:Request,res:Response)=>{
    res.send("Hello Protected")
})

app.get('/api/chat',(req:Request,res:Response)=>{
    res.send("Hello World")
})

app.get('/api/chat/:id',(req:Request,res:Response)=>{})


app.listen(PORT, () => {
    console.log("Server Started ");
});