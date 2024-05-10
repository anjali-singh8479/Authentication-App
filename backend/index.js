import express from "express"
import mysql from "mysql2"
import cors from "cors"
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
    const values=[req.body.name,req.body.email,req.body.password]
    db.query(q,[values],(err,data)=>{
        if(err)
            return res.json(err)
        return res.json(data);
    })
})
app.listen("8800",()=>{
console.log("backend connected");
})