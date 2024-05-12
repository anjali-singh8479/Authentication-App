import express from "express"
import mysql from "mysql2"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
const salt=10;
const app=express();
app.use(express.json())

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST","GET"],
    credentials:true
}))
app.use(cookieParser())
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Aa05102001@",
    database:"authenticationapp",
})
app.post("/register",(req,res)=>{
    const q="INSERT INTO details(`name`,`email`,`password`) VALUES(?)";
    bcrypt.hash(req.body.password,salt,(err,hash)=>{
        if(err)
            return res.json(err)
        const values=[req.body.name,req.body.email,hash]
        db.query(q,[values],(err,data)=>{
            if(err)
                return res.json(err)
            return res.json(data);
        })
    })
})
const verifyuser=(req,res,next)=>{
    // console.log(req)
    const token=req.cookies.token

    if(!token){
        // console.log("no token")
        return res.json("Token not found")
    }
    jwt.verify(token,"jwt-secret-key",(err,decode)=>{
        // console.log("token found")
        if(err)
            return res.json({error:"Invalid Token"})
        req.name=decode.name
        next()

    })
}
app.get("/",verifyuser,(req,res)=>{
    return res.json({status:"success",name:req.name})
})
app.post("/login",(req,res)=>{
    const q="SELECT * FROM details WHERE email=?"
    const values=[req.body.email]
    // const q=`SELECT * FROM details WHERE email='${req.body.email}' AND password='${req.body.password}'`;
    // const values=[req.body.email,req.body.password]
    db.query(q,[values],(err,data)=>{
        if(err)
            return res.json(err)
        if(data.length>0){
          bcrypt.compare(req.body.password.toString(),data[0].password,(error,response)=>{
            if(error)
                return res.json(error)
            if(response== true){
                console.log("response true")
                const name=data[0].name
                // console.log(name)
                const token=jwt.sign({name},"jwt-secret-key",{expiresIn:"1d"})
                res.cookie("token",token)
                return (res.json({status:"success"}))
            }else{
                return res.json("Incorrect Password")
            }
          })
        }
        else
        return res.json("No user is registered with this email")
    })
})
app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.json({status:"token deleted succesfully"})
})
app.listen("8800",()=>{
console.log("backend connected");
})