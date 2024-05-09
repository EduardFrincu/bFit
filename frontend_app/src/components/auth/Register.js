import React, {useState} from "react";
import registerImage from "../../assets/images/register.svg";
import './Auth.scss';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService'

const Register = ({history}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');

    const  submitForm = e =>{
        e.preventDefault();
        AuthService.register({firstName,lastName, email, gender, password}, history)
        .then(res => console.log(res));
    }


  return (    
    <div id = 'auth-container'>
        <div id = 'auth-card'>
            <div className="card-shadow">
                <div id = 'image-section'>
                    <img src = {registerImage} alt = 'Login'/>
                </div>
                <div id = 'form-section'>
                    <h2>Create an account</h2> 
                    <form onSubmit={submitForm}>

                        <div className = 'input-field mb-1'>
                            <input 
                                onChange={event => setFirstName(event.target.value)}
                                value = {firstName}
                                required = 'required' 
                                type = 'text' 
                                placeholder="First Name"/>
                        </div>

                        <div className = 'input-field mb-1'>
                            <input 
                                onChange={event => setLastName(event.target.value)}
                                value = {lastName}
                                required = 'required' 
                                type = 'text' 
                                placeholder="Last Name"/>
                        </div>

                        <div className = 'input-field mb-1'>
                            <input 
                                onChange={event => setEmail(event.target.value)}
                                value = {email}
                                required = 'required' 
                                type = 'text' 
                                placeholder="Email"/>
                        </div>

                        <div className = 'input-field mb-1'>
                            <select
                                onChange={event => setGender(event.target.value)}
                                value = {gender}
                                required = 'required' 
                            >
                                <option value = 'M'>Male</option>  
                                <option value = 'F'>Female</option>  
                            </select>
                        </div>

                        <div className = 'input-field mb-2'>
                            <input 
                                onChange={event => setPassword(event.target.value)}
                                value = {password}
                                required = 'required' 
                                type = 'password' 
                                placeholder="Password"/>
                        </div>

                        <button>REGISTER</button>

                    </form>
                    <p> Already have an account? <Link to = '/login'>Login</Link></p>
                </div>
            </div>
        </div>
    </div>
);
};

export default Register;
