import API from './api'
import Cookies from 'universal-cookie';
const MealPlanService = {
    create: (data,history) => {
        return API.post('/mealPlan',data,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => { 
            console.log(res.data);
            history.push('/viewMealPlans');
            return data
            
        })
        .catch(err => {
            console.log('Error inserting the plan' , err);
            throw err;
        })
    },
    getMealPlans : () =>{
        return API.get('/viewMealPlans',{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            return res;
        })
    },
    deleteMealPlan : (data, history) =>{
        return API.delete(`/deleteMealPlan/${data.mealPlanId}`,{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            history.push('/viewMealPlans');
            return res;
            
        })
        .catch(err =>{
            console.log("Error deleting the meal plan", err);
            throw err;
        })
    },
    getRandomMealPlan: () =>{
        return API.get('/getMealPlanByCalories',{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) =>{
            return res;
        })
        .catch(err =>{
            console.log("Error while getting a meal plan");
            throw err;
        })
    },
    saveMealPlan: (data, history) =>{
        return API.post('/saveMealPlan', data, {headers: {'authorization': `Bearer ${new Cookies().get('token')}`}})
        .then((res) => {
            history.push('/viewMealPlans');
            return res.data;
        })
        .catch(err =>{
            console.log('Error saving the plan' , err);
            throw err;
        })
    }

}
export default MealPlanService