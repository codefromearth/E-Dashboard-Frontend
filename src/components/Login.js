import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth)
        navigate("/")
    })
    const handlelogin=async()=>{
        console.log(email,password)
        let result=await fetch('http://localhost:5050/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        );

        result =await result.json()
        console.log(result)
        if(result.auth){
             localStorage.setItem('user',JSON.stringify(result.user));
             localStorage.setItem('token',JSON.stringify(result.auth));
             navigate('/')
        }
        else{
            alert("enter correct details")
        }



    }
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
  return (
    <div className='signupbox'>
    <h1>Login</h1>
      <input type='text' className='inputbox' placeholder='enter email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input type='password' className='inputbox' placeholder='enter password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      <button onClick={handlelogin} style={{backgroundColor:"skyblue",width:"100px",borderRadius:"5px",cursor:"pointer"}}>sign in</button>
    </div>
  )
}

export default Login
