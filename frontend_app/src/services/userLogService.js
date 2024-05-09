import API from './api'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
const cookies = new Cookies();
const WeightLog = {
    insertLog: (data) => {
        return API.post('/insertUserLog', data, {headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res)=>{
            console.log(res);
        })
        .catch((err) =>{
            console.log('Error updating your profile' , err);
            throw err;
        })
    },
    getUserLogs: () =>{
        return API.get('/getWeightLog',{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) =>{
            return res;
        })
        .catch(err =>{
            console.log("Error while getting the user's log");
            throw err;
        })
    },
}
export default WeightLog