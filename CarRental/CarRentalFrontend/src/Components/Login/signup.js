import React from 'react'
import './signup.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const [email,setUser] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('select')
  const navigate = useNavigate()
  const userLogin = () =>{
      if(email === '' || password === '' || role === 'select')
        alert('please fill or select correctly')
      else{
        if(role === 'user'){
          axios.post('http://localhost:1001/user/logins',{'email':email,'password':password}).then((res)=>{
            if(res.data !== 'incorrect crediantials' && res.data !== 'login details not found'){
              localStorage.setItem('email',email)
              localStorage.setItem('name',res.data.name)
              navigate('/userDashboard/')
              axios.post('http://localhost:1001/user',{email:email}).then((val)=>{
                console.log(val.data)
              })
            }
            else{
              alert(res.data);
            }
          })
        }else if(role === 'owner'){
          axios.post('http://localhost:1001/owner/logins',{'email':email,'password':password}).then((res)=>{
            if(res.data !== 'incorrect crediantials' && res.data !== 'login details not found'){
              localStorage.setItem('email',email)
              localStorage.setItem('name',res.data.name)
              navigate('/ownerDashboard/')
              axios.post('http://localhost:1001/',{email:email}).then((val)=>{
                console.log(val.data)
              })
            }
            else{
              alert(res.data);
            }
          })
        }else{

        }
      }
  }
  return(
        <div className='signup' style={{marginBottom:'30px'}}>
          <h3 className='signText'>SIGN IN</h3>
            <div className='signup-input'>
                <div className='signup-div'>
                  <input type='email' placeholder='Email' onChange={(e)=>setUser(e.target.value)} className='cont-spac' />
                  <span className='signup-span'>EMAIL</span>
                </div>
                <div className='signup-div'>
                  <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='cont-spac' />
                  <span className='signup-span'>PASSWORD</span>
                </div>
                <div className='signup-div' style={{
                  display:'flex',
                  margin:'10px'
                }}>
                  <select onChange={(e)=> setRole(e.target.value)} style={{
                  height:'30px'
                  }} >
                    <option value='select'>Select Role</option>
                    <option value='admin'>Admin</option>
                    <option value='owner'>Owner</option>
                    <option value='user'>User</option>
                  </select>
                </div>
                  
                <div style={{
                  margin:'10px',
                  display:'flex'
                }}>
                  <Link onClick={()=>{alert("Sorrry We will reach you ")}}>forgot Password</Link>
                </div>
                <div className='signup-div'>
                  <button className='signupSubmit btn btn-primary' onClick={userLogin}>Login</button>
                </div>

                <div className="signup-div">
                 <code>Don't you have an account</code> &nbsp; 
                 <button className='btn btn-warning' onClick={()=>{navigate('/signup')}}>Signup</button> &nbsp; <code> here</code>
                </div>

            </div>
        </div>
  )
}

export default Signup

