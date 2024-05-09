import React, {useEffect, useState} from 'react'
import DiaryService from '../../services/DiaryService';
import VerifyTokenService from "../../services/verifyTokenService";
import './Diary.scss'
import {buildStyles, CircularProgressbar, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faAdd, faArrowRightLong, faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TodayDiary = ({history}) => {

  	const [diaryId, setDiaryId] = useState();
  	const [diary, setDiary] = useState();
  	const [breakfast, setBreakfast] = useState();
  	const [lunch, setLunch] = useState();
  	const [dinner, setDinner] = useState();
	const [intake, setIntake] = useState();
	const [goal, setGoal] = useState();
	const [macros, setMacros] = useState({carbohydrates: 0,proteins: 0,fats: 0});

	useEffect(()=>{
		VerifyTokenService.verify(history)
		DiaryService.createDiary(null,history)
		.then((res) =>{
			setDiaryId(res.data.id);
			
		})

		DiaryService.getUserHistoryDataByDate({createdAt:new Date()}, history)
			.then((res)=>{
				console.log(res)
				setIntake(res.data.intake)
				setGoal(res.data.goal);

			})
	},[]); // eslint-disable-line react-hooks/exhaustive-deps  
	 
	useEffect(()=>{
		if(goal != undefined && intake != undefined){
			DiaryService.calculateMacros({goal,intake},history)
		.then((res)=>{
			console.log(res.data);
			setMacros(res.data)
		})
	}
	},[goal,intake])
	
	useEffect(()=>{
		if(diaryId){
			

			DiaryService.getTodayDiary(diaryId, history)
			.then((res) =>{
				setDiary(res.data)
				res.data.MealEntries.map((element)=>{
					if(element.type == 'dinner')setDinner(element)
					else if(element.type == 'lunch') setLunch(element)
					else if(element.type == 'breakfast') setBreakfast(element)
				})
			}) 
		}	
	},[diaryId]) // eslint-disable-line react-hooks/exhaustive-deps   


	const mealCalories = (data) =>{
		let calories = 0;
		data.Food.map((element) =>{
			calories += element.caloriesPer100g*element.grams/100
		})
		return calories;
	}
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
	
    <div id = "content">
		{diary &&  
		<div id = "today-diary-container">
			<div id = "diary">
				<div id = "progressbar">
					
					<CircularProgressbarWithChildren value={diary.calories} 
										minValue = {0} 
										maxValue = {intake} 
										text = {`${parseFloat(intake).toFixed(2) - parseFloat(diary.calories)} kcal`}
										strokeWidth = {7} 
										styles = {buildStyles({textSize:'15px',pathColor:'#417D7A' ,textColor: '#417D7A',pathTransitionDuration: 0.5,})}
										>
											<p style ={{marginTop: 75 + 'px', fontSize: 22 + 'px', color: '#417D7A'}}>Remaining</p>
										</CircularProgressbarWithChildren>
										
				</div>
				<div id = "diary-content">
					<div id = "breakfast">
						<div className = "logged-meal">	
							<p>Breakfast</p>
							<Link to = {`/createEntry/${diaryId}/breakfast`}>
								<button className="add-btn" ><FontAwesomeIcon icon={faAdd} /></button>
							</Link>
						</div>
						<div className='diary-info'>
							<FontAwesomeIcon icon={faUtensils} />
							{breakfast ? ` ${mealCalories(breakfast)} kcal` : ` 0 kcal` }
						</div>
					</div>
					

					<div id = "lunch">
						<div className = "logged-meal">	
							<p>Lunch</p>
							<Link to = {`/createEntry/${diaryId}/lunch`}>
								<button className="add-btn" ><FontAwesomeIcon icon={faAdd} /></button>
							</Link>
						</div>
						<div className='diary-info'>
							<FontAwesomeIcon icon={faUtensils} />
							{lunch ? ` ${mealCalories(lunch)} kcal` : ` 0 kcal` }
						</div>
					</div>

					<div id = "dinner">
						<div className = "logged-meal">	
							<p>Dinner</p>
							<Link to = {`/createEntry/${diaryId}/dinner`}>
								<button className="add-btn" ><FontAwesomeIcon icon={faAdd} /></button>
							</Link>
						</div>
						<div className='diary-info'>
							<FontAwesomeIcon icon={faUtensils} />
							{dinner ? ` ${mealCalories(dinner)} kcal` : ` 0 kcal` }
						</div>
					</div>
				</div>
			</div>

			<div id = "macro">
				<div className='macro-data'>{ `Proteins: ${diaryMacros(diary,'proteins')} / ${macros.proteins} g `} </div>
				<div className='macro-data'> { `Fats: ${diaryMacros(diary,'fats')} / ${macros.fats} g `}</div>
				<div className='macro-data'> { `Carbs: ${diaryMacros(diary,'carbohydrates')} / ${macros.carbohydrates} g `}</div>
			
			</div>

			<div id = "more-details">
				<Link to = {`/diaryDetails/${diaryId}`}>	
					<button className="more-btn" >More details</button>
				</Link>
			</div>
		</div>
		}
       
    </div>
  )
}

export default TodayDiary
