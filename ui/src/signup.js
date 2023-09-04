import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signupval from './signupValidation'
import axios from 'axios'

function Signup() {
    const [values, setValues] = React.useState({
        name: '',
        email: '',
        password: ''
      });
      const navigate = useNavigate();
      const [Err, setErr] = React.useState({})
      const handleSubmit =(event) => {
        event.preventDefault();
        setErr(signupval(values));
        if(Err.name ==="" && Err.email === "" && Err.password === "")
        {
            axios.post('http://localhost:8080/signup', values)
            .then(res =>{
                navigate('/login');
            })
            .catch(err => console.log(err));
        }
      };
      const handleInput =(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
      };
      
    return (
        <div>
            <div style={{ padding: '258px', alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100px', width: '976px', border: '4px' }}>
                <form action="" onSubmit={handleSubmit}>
                    <div style={{ padding: '5px' }}>
                        <label style={{ padding: '10px' }}><h1>Name :</h1></label>
                        <input type="text" placeholder="Enter Name" name="name" onChange={handleInput} style={{ padding: '10px', width: '500px' }} />
                        <br></br>
                        {Err.name && <span style={{color: 'red'}}> {Err.name}</span>}
                    </div>
                    <div style={{ padding: '5px' }}>
                        <label style={{ padding: '10px' }}><h1>Email :</h1></label>
                        <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} style={{ padding: '10px', width: '500px' }} />
                        <br></br>
                        {Err.email && <span style={{color: 'red'}}> {Err.email}</span>}
                    </div>
                    <div style={{ padding: '5px' }}>
                        <label style={{ padding: '10px' }}><h1>Password :</h1></label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} style={{ padding: '10px', width: '500px' }} />
                        <br></br>
                        {Err.password && <span style={{color: 'red'}}> {Err.password}</span>}
                    </div>
                    <button type="submit" style={{margin: '20px', width: '100px', textalign: 'center', background:'green', color:'white'}}><h2>SignUp</h2></button>
                    <Link to='/login' style={{ margin: '20px', width: '100px', textalign: 'center'}}><h2>Login</h2></Link>
                </form>

            </div>
        </div>
    )
}

export default Signup
