import express from "express"
import mysql from "mysql2"
import cors from "cors"
import bcrypt from "bcrypt"
const salt=10;
const app=express();
app.use(express.json())
app.use(cors())
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
            if(response== false)
                return (res.json("Incorrect Password"))
            return (res.json({status:"success"}))
          })
        }
        else
        return res.json("No user is registered with this email")
    })
})
app.listen("8800",()=>{
console.log("backend connected");
})