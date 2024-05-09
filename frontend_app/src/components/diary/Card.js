import React, { useEffect, useState } from 'react'
import {buildStyles, CircularProgressbar, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DiaryService from '../../services/DiaryService';



const Card = (props) => {
    const [intake, setIntake] = useState(0);
    const [goal, setGoal] = useState();
    const [macros, setMacros] = useState();
    const formatDate = (date) => {
        let newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    }
    useEffect(()=>{
        DiaryService.getUserHistoryDataByDate(props.element)
                    .then(res => {
                        console.log(res);
                        setIntake(res.data.intake)
                        setGoal(res.data.goal)
                        let goal = res.data.goal;
                        let intake = res.data.intake;
                        DiaryService.calculateMacros({goal,intake},props.history)
                        .then((res)=>{
                            console.log(res.data);
                            setMacros(res.data)
                        })
                    });
        let goal = props.element.goal;
   
        
    },[])
    console.log(props.element.id);

    const diaryMacros = (data, key) =>{
		let sum = 0;
		data.MealEntries.map((MealEntry) =>{
			MealEntry.Food.map((food) =>{
				sum += food[key] * food.grams/100;
			})
		})
		return parseFloat(sum).toFixed(2);
	}

  return (
    
    <div>
    {macros &&
        <div>
        <div className='card'>
        <div className='date'>
                <h3> {formatDate(props.element.createdAt)}</h3>
            </div>
            <div className='progress-bar'>
                <CircularProgressbarWithChildren value={props.element.calories} 
                                            minValue = {0} 
                                            maxValue = {intake} 
                                            text = {`${parseFloat(props.element.calories)}/`}
                                            strokeWidth = {7} 
                                            styles = {buildStyles({textSize:'18px',pathColor:'#e35c07' ,textColor: '#fff',pathTransitionDuration: 0.5,trailColor: "#fff "})}
                                            >
                                                <p style ={{marginTop: 75 + 'px', fontSize: 1.5 + 'rem', color: '#fff'}}>{intake}kcal</p>
                                            </CircularProgressbarWithChildren>
            </div>
            
            <div className='macros-stats'>
                <div className='proteins'> 
                Proteins
                <CircularProgressbarWithChildren value={diaryMacros(props.element, 'proteins')} 
                                            minValue = {0} 
                                            maxValue = {macros.proteins} 
                                            text = {`${diaryMacros(props.element, 'proteins')}g`}
                                            strokeWidth = {7} 
                                            styles = {buildStyles({textSize:'19px',pathColor:'#417D7A' ,textColor: '#fff',pathTransitionDuration: 0.5,background:true, trailColor: "#fff"})}
                                            >
                                            </CircularProgressbarWithChildren> 
                </div>
                <div className='fats'> 
                Carbs
                <CircularProgressbarWithChildren value={diaryMacros(props.element, 'carbohydrates')} 
                                            minValue = {0} 
                                            maxValue = {macros.carbohydrates} 
                                            text = {`${diaryMacros(props.element, 'carbohydrates')}g`}
                                            strokeWidth = {7} 
                                            styles = {buildStyles({textSize:'19px',pathColor:'#417D7A' ,textColor: '#fff',pathTransitionDuration: 0.5,trailColor: "#fff "})}
                                            >
                                            </CircularProgressbarWithChildren> 
                </div>
                <div className='carbs'> 
                Fats
                <CircularProgressbarWithChildren value={diaryMacros(props.element, 'fats')} 
                                            minValue = {0} 
                                            maxValue = {macros.fats} 
                                            text = {`${diaryMacros(props.element, 'fats')}g`}
                                            strokeWidth = {7} 
                                            styles = {buildStyles({textSize:'19px',pathColor:'#417D7A' ,textColor: '#fff',pathTransitionDuration: 0.5,trailColor: "#fff "})}
                                            >
                </CircularProgressbarWithChildren> 
                </div>
            </div>
        </div>
        <div>
        
        </div>
    </div>
}
    </div>
    
  )
}

export default Card
