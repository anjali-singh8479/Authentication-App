import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const [details,setdetails]=useState({
        "name":"",
        "email":"",
        "password":""
    });
    const navigate=useNavigate()
    const handlechange=(e)=>{
    setdetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    console.log(details)
    }
    const register=async()=>{
    try{
    const res=await axios.post("http://localhost:8800/register",details);
    navigate("/login")
     console.log(res)
    return res;
    }catch(err){
        return err
    }
    }
  return (
    <>
    <div className='input-wrapper'>
        <label>Name</label>
        <input type='text' placeholder='enter the name' name='name' onChange={handlechange}></input>
    </div>
    <div className='input-wrapper'>
        <label>Email</label>
        <input placeholder='Enter the email' onChange={handlechange} name="email"></input>
    </div>
    <div className='input-wrapper'>
        <label>Password</label>
        <input placeholder='Enter the password' onChange={handlechange} name="password"></input>
    </div>
    <button className="button-click" id="register-button" onClick={register}>Submit</button>
    <button className='button-click' id='login-button'><Link to="/login">Login</Link></button>
    </>
  )
}

export default Register