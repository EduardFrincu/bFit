import React, {useEffect, useState} from "react";
import loginImage from "../../assets/images/login.svg";
import './Auth.scss';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService'

const Login = ({history}) => {
    const [email, setEmail] = useState('john.doe@gmail.com');
    const [password, setPassword] = useState('secret');
    useEffect(()=>{
        
        return () => {window.location.reload(false);}
    },[])
    const  submitForm = e =>{
        e.preventDefault();
        AuthService.login({email, password}, history)
        .then(res => console.log(res));
        // axios.post('http://127.0.0.1:3000/login', {email,password})
        // .then(res =>{
        //     console.log("res",res);

        // })
        // .catch(err =>{
        //     console.log('err', err);
        // })

        //console.log({email,password});
    }

  return (
    <div id = 'auth-container'>
        <div id = 'auth-card'>
            <div className="card-shadow">
                <div id = 'image-section'>
                    <img src = {loginImage} alt = 'Login'/>
                </div>
                <div id = 'form-section'>
                    <h2>Welcome</h2> 
                    <form onSubmit={submitForm}>
                        <div className = 'input-field mb-1'>
                            <input
                            onChange={event => setEmail(event.target.value)}
                            value = {email}
                            required = 'required' 
                            type = 'text' 
                            placeholder="Email"></input>
                        </div>
                        <div className = 'input-field mb-2'>
                            <input 
                            onChange={event => setPassword(event.target.value)}
                            value = {password} 
                            required = 'required' 
                            type = 'password' 
                            placeholder="Password"></input>
                        </div>
                        <button>LOGIN</button>
                    </form>
                    <p> Don't have an account? <Link to = '/register'>Register</Link></p>
                </div>
            </div>
        </div>
    </div>
  )};

export default Login;
