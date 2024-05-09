import API from './api'
import Cookies from 'universal-cookie';

const DiaryService = {
    createDiary: (data,history) => {
        return API.post('/createDiary', data, {headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res)=>{
            return res;
        })
        .catch((err) =>{
            console.log('Error updating your profile' , err);
            history.push('/');
            throw err;
        })
    },
    getTodayDiary : (data, history) =>{
        return API.get(`/diary/${data}`,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            return res;
            
        })
        .catch(err =>{
            console.log("Error getting the diary", err);
            history.push('/');
            throw err;
        })
    },
    calculateMacros : (data,history) =>{
        return API.get(`/api/calculateMacros/${data.goal}/${data.intake}`,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            console.log(res)
            return res;
            
        })
        .catch(err =>{
            console.log("Error getting the diary", err);
            history.push('/');
            throw err;
        })
    },
    createEntryLog : (data,history) =>{
        return API.post("/createEntry",data, {headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            history.push('/todayDiary');
            return res;
            
        })
        .catch(err =>{
            console.log("Error logging food", err);
            history.push('/');
            throw err;
        })
    },
    getDiary : (data,history) =>{
        return API.get(`/diary/${data.diaryId}`,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then(res =>{
            return res;
        })
        .catch(err=>{
            console.log("Error fetching the diary", err);
            throw err
        })
    },
    getDiaryHistory : (history) =>{
        return API.get(`/diaryHistory`,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then(res =>{
            return res;
        })
        .catch(err=>{
            console.log("Error fetching the diary history", err);
            throw err
        })
    },
    deleteDiaryLog: (data,history) =>{
        return API.delete(`deleteDiaryLog/${data.foodId}/${data.mealEntryId}`,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then(res => {
            console.log(res);
            history.push('/todayDiary');
            return res;
        })
        .catch(err =>{
            console.log("Error deleting the log", err);
            throw err;
        })
    },
    getUserHistoryDataByDate: (data) => {
        return API.get(`/api/userHistory/${data.createdAt}`,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            return res;
        })
        .catch((err)=>{
            console.log("Error while getting user info", err.message);
            throw err;
        })

    }

}
export default DiaryService;