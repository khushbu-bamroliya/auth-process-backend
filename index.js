import express from 'express'
import path from 'path'
import connectDB from './database/db.js';
import dotenv from 'dotenv'

import cors from 'cors'

import passport from 'passport'

import expressSession from 'express-session'
import User from './model/user.js'
import initializingPassport from './passportConfig.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()

// database connection
connectDB()

const app = express()
app.use(cors())

app.use(express.static(path.resolve(__dirname,'../front/build')))


app.use(express.json())
app.use(express.urlencoded({extended:false}))

const PORT = 4000;

// passport initialize
initializingPassport(passport);


app.use(expressSession({
    secret:'secreat',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());


app.get("/auth/google",passport.authenticate('google', 
{ scope: ['profile','email'] })
,(req,res)=>{
    console.log('res',res);
    res.render("/")
})

app.get("/auth/google/callback",passport.authenticate('google',{
    // failureRedirect:'/'
}),(req,res)=>{
    res.send(true)
})

app.get('/current_user',(req,res)=>{
    console.log(req)
    res.send(req.user)
})

app.get('/api/logout',(req,res)=>{
    req.logout(()=>{})
    res.send(req.user)
})

// app.post("/register",async(req,res)=>{
//     console.log('2nd');
//     const user = await User.findOne({
//         name:req.body.name
//     });
//     if (user)return res.status(400).send("User exists");
//     const newUser= await User.create(req.body);
//     res.status(201).send(newUser)
// })


app.get("/",(req,res)=>{
    res.send({message:'hellow from server !'});
})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..front/build','index.html'))
})

app.listen(PORT,()=>console.log(`server is running successfully on port http://localhost:${PORT}`))