import API from './api'
import Cookies from 'universal-cookie';
const VerifyTokenService = {
    verify: (history) => {
        return API.get('/',{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
            .then((res) => {
                return res.data

            })
            .catch(err => {
                console.log('ERR' , err);
                history.push('/login')
                throw err;
            })
            
    }
}
export default VerifyTokenService