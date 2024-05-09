import React, {useState, useEffect} from 'react'
import VerifyTokenService from "../../services/verifyTokenService";
import API from '../../services/api';
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom';
import './MealPlan.scss';
import MealTable from './SortingTable';
import MealPlanService from '../../services/mealPlanService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter, faTrashCan} from '@fortawesome/free-solid-svg-icons';
const ViewMealPlans = ({history}) => {

    const [plans, setPlans] = useState();
    const [expansionState, setExpansionState] = useState({});
    useEffect(() =>{
        VerifyTokenService.verify(history);
        MealPlanService.getMealPlans().then(res => {
            let exp = []
            res.data.forEach((elem) => {
                exp.push('collapsed');
            })
            setExpansionState(exp);
            if(plans === undefined)
                setPlans(res.data); 
            
        })
        // const loadMealPlans = async() => {
        //     const response = await API.get('/viewMealPlans',{headers: {'authorization': `Bearer ${new Cookies().get('token')}`}});
        //     setPlans(response.data); 
        // }
        // loadMealPlans();
    }, [plans]); // eslint-disable-line react-hooks/exhaustive-deps   

    const handleClick = (index) => {
        let expansion = [...expansionState];
        if(expansion[index] === 'expanded'){
            expansion[index] = 'collapsed'
        }
        else expansion[index] = 'expanded'

        setExpansionState(expansion)
  
    }

    //let history = useHistory();

  return (
     
    <div id = 'view-plans'>
        {plans && 
                    plans.map((element,index) =>{
                        return(
                            <div key = {index}>
                                
                                <div id = "expansion-state-icon" >
                                    <FontAwesomeIcon className='container-icon' icon={faTrashCan} onClick = {() => {MealPlanService.deleteMealPlan({mealPlanId: element.id},history); setPlans(undefined);}}/> 
                                    <FontAwesomeIcon className='container-icon' onClick = {() => handleClick(index)} icon={expansionState[index] == 'expanded' ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter}/>    
                                </div>                                
                            <div className={`mealPlans-container container ${expansionState[index]}`}> 

                                <h1 className='mealPlan-title'>{`${element.name}, ${element.calories} kcal`} </h1>
                                {
                                    element.Meals.map((meal, mealIndex)=>{
                                        return(
                                            <div className = 'meals-container' key = {mealIndex}>
                                                 <h2 className="mealtype">{meal.type}</h2>
                                                 <MealTable Food = {meal.Food}></MealTable>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </div>
                            )
                    }
                )
            
      
        } 
        
    </div>
  )
}

export default ViewMealPlans
