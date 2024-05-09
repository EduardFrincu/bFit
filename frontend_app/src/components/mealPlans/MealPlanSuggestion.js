import React, {useState, useEffect} from 'react'
import MealPlanService from '../../services/mealPlanService'
import VerifyTokenService from '../../services/verifyTokenService';
import { faSave} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MealTable from './SortingTable';
import { Link } from 'react-router-dom';
const MealPlanSuggestion = ({history}) => {

    const [plan, setPlan] = useState();
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();
    const [expansionState, setExpansionState] = useState('expanded');
    useEffect(()=>{
        VerifyTokenService.verify(history)

        MealPlanService.getRandomMealPlan()
        .then(res=>{
            setPlan(res.data);
        })
        .catch(err =>{
            console.log(err.response)
            setMessage(err.response.data);
            setStatus(err.response.status);
            console.log(status)
        })
      },[]); // eslint-disable-line react-hooks/exhaustive-deps   



    console.log(plan)
  return (
        <div>  
            
            {plan && <div> 
                <div id = "expansion-state-icon" >
                    <FontAwesomeIcon className='container-icon' icon = {faSave} onClick = {() =>{MealPlanService.saveMealPlan(plan, history)}} />    
                </div>                                
                <div className={`mealPlans-container container ${expansionState}`}> 
                    <h1 className='mealPlan-title'>{`${plan.name}, ${plan.calories} kcal`} </h1>
                        {
                            plan.Meals.map((meal, mealIndex)=>{
                                return(
                                    <div className = 'meals-container' key = {mealIndex}>
                                            <h2 className="mealtype">{meal.type}</h2>
                                            <MealTable Food = {meal.Food}></MealTable>
                                    </div>
                                )
                            })
                        }
                </div>
            </div> } 
            {
                status && <div className='error-container container'>
                <h2>{message.message} </h2>
                <Link to = {"/"}>
                     <button className='btn'>Home</button>
                </Link>
             </div>
            }

        </div>
  )
}

export default MealPlanSuggestion
