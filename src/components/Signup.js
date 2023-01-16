import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()
    
    useEffect(()=>{
      const auth=localStorage.getItem('user');
      if(auth)
      {
        navigate('/')
      }
    })

    const collectData=async()=>{
        console.log(name,email,password)
        let result=await fetch('http://127.0.0.1:5050/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });

         result=await result.json()
        console.log(result)
        localStorage.setItem('user',JSON.stringify(result.result))
        localStorage.setItem('token',JSON.stringify(result.auth))

        

            navigate('/')

        
    }
  return (
    <div className='signupbox'>
      <h1>Register</h1>
      <input className='inputbox' type='text' placeholder='Enter name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
      <input className='inputbox' type='text' placeholder='Enter Email'  value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input  className='inputbox' type='password' placeholder='Enter Password'  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      <button type='button' style={{backgroundColor:"skyblue",width:"100px",borderRadius:"5px",cursor:"pointer"}}
      onClick={collectData}
      >signup</button>
    </div>
  )
}

export default Signup
