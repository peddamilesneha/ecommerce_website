import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { useState } from 'react'
import validation from './loginValidation';
import axios from 'axios'
import Cookies from "js-cookie";

function Login() {
    const [values, setValues] = React.useState({
      email: '',
      password: ''
    });
    const navigate = useNavigate();
    const [Err, setErr] = React.useState({})
    const handleSubmit =(event) => {
      event.preventDefault();
      setErr(validation(values));
      if(Err.email === "" && Err.password === "")
        {
            axios.post('http://localhost:8080/login', values)
            .then(res =>{
              if(res.data.status === "Success")
              {
                Cookies.set('uid', res.data.uid);
                navigate('/');
              }
              else{
                alert("No Login Record Exist");
              }
                
            })
            .catch(err => console.log(err));
        }
    }
    const handleInput =(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }


  return (
    <div>
        <div style={{padding:'250px', alignItems: 'center', justifyContent: 'center', display: 'flex', height:'100px', width:'1000px', border: '4px'}}>
        <form action="" onSubmit={handleSubmit}>
        <div style={{padding:'5px'}}> 
          <label style={{padding:'10px'}}><h1>Email :</h1></label>
          <input type="email"  placeholder="Enter Email" name="email" onChange={handleInput} style={{padding:'10px', width: '500px'}}/>
          <br></br>
          {Err.email && <span style={{color: 'red'}}> {Err.email}</span>}
        </div>
        <div style={{padding:'5px'}}>
          <label style={{padding:'10px'}}><h1>Password :</h1></label>
          <input type="password"  placeholder="Enter Password" name="password" onChange={handleInput} style={{padding:'10px', width: '500px'}}/>
          <br></br>
          {Err.password && <span style={{color: 'red'}}> {Err.password}</span>}
        </div>
        <button type="submit" style={{margin: '20px', width: '100px', textalign: 'center', background:'green', color:'white'}}><h2>Login</h2></button>
        <Link to='/signup' style={{margin: '20px', width: '300px', textalign: 'center'}}><h2>Create New Account</h2></Link>
      </form>

        </div>
    </div>
  )
}

export default Login
