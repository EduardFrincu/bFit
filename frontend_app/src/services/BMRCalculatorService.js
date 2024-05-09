import API from './api'
import Cookies from 'universal-cookie';

const BMRCalculatorService = {
    updateProfile: (data) => {
        return API.post('/updateUserProfile', data, {headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res)=>{
            console.log(res);
        })
        .catch((err) =>{
            console.log('Error updating your profile' , err);
            throw err;
        })
    },
    getUserInfo: () => {
        return API.get('/api/user',{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            return res;
        })
        .catch((err)=>{
            console.log("Error while getting user info", err.message);
            throw err;
        })

    },
}
export default BMRCalculatorService;