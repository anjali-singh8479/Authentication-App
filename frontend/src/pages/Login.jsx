import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
const Login = () => {
  const navigate=useNavigate()
  const[details,setdetails]=useState({
    email:"",
    password:""
  });
  const handlechange=(e)=>{
   setdetails((prev)=>({...prev,[e.target.name]:e.target.value}))
   console.log(details)
  }
  const handlelogin=async()=>{
   try{  
    console.log("inside login") 
    const res=await axios.post("http://localhost:8800/login",details)
   if(res.data.status==="success"){
    navigate("/");
   }
   else{
    alert(res.data)
   }
    return res
  }catch(err){
  return err
  }
}
  return (
    <>
   
    <div className='input-wrapper'>
        <label>Email</label>
        <input placeholder='Enter the email' onChange={handlechange} name="email"></input>
    </div>
    <div className='input-wrapper'>
        <label>Password</label>
        <input placeholder='Enter the password' onChange={handlechange} name="password"></input>
    </div>
    <button className="button-click" id="login-button" onClick={handlelogin}>login</button>
    <button className="button-click" id='register-button'><Link>Create Account</Link></button>
   
    </>
  )
}

export default Login