import API from './api'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
const cookies = new Cookies();
const AuthService = {
    login: (data, history) => {
        return API.post('/login', data)
            .then((res) => { 
                cookies.set('token', res.data.token, { path: '/', expires: new Date(jwt_decode(res.data.token).exp*1000)});
                console.log(API.defaults);
                history.push('/');
                return data
                
            })
            .catch(err => {
                console.log('Auth service err' , err);
                throw err;
            })
            
    },
    register: (data, history) =>{
        return API.post('/register', data)
        .then((res) => {
            cookies.set('token', res.data.token, { path: '/', expires: new Date(jwt_decode(res.data.token).exp*1000)});
            history.push('/');
            return data
            
        })
        .catch(err => {
            console.log('Auth service err' , err);
            throw err;
        })

    },
    logout: () =>{
        cookies.remove('token');
    }

}

export default AuthService