import React, { useState } from 'react'
import axios from "axios"
const Register = () => {
    const [details,setdetails]=useState({
        "name":"",
        "email":"",
        "password":""
    });
    const handlechange=(e)=>{
    setdetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    console.log(details)
    }
    const register=async()=>{
    try{
    const res=await axios.post("http://localhost:8800/register",details);
    console.log(res)
    return res;
    }catch(err){
        return err
    }
    }
  return (
    <>
    <div>
        <label>Name</label>
        <input type='text' placeholder='enter the name' name='name' onChange={handlechange}></input>
    </div>
    <div>
        <label>Email</label>
        <input placeholder='Enter the email' onChange={handlechange} name="email"></input>
    </div>
    <div>
        <label>Password</label>
        <input placeholder='Enter the password' onChange={handlechange} name="password"></input>
    </div>
    <button onClick={register}>Submit</button>
    </>
  )
}

export default Register