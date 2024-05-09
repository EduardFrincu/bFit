import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import DiaryService from '../../services/DiaryService';
import VerifyTokenService from '../../services/verifyTokenService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faAdd, faArrowRightLong, faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import MealTable from '../mealPlans/SortingTable';
import { Link } from 'react-router-dom';


const DiaryDetails = ({history}) => {

    const [diary, setDiary] = useState();
    const [todayDiaryId, setTodayDiaryId] = useState();
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();
    const params = useParams();
    
    const diaryId = params.diaryId;
    useEffect(()=>{
        VerifyTokenService.verify(history)

        DiaryService.getDiary({diaryId}, history)
        .then(res=>{
           if(res) setDiary(res.data);
           
        })
        .catch(err =>{
            console.log(err.response)
            setMessage(err.response.data);
            setStatus(err.response.status);
            console.log(status)
        })


        DiaryService.createDiary(null,history)
		.then((res) =>{
            
			setTodayDiaryId(res.data.id);
        })
      },[]); // eslint-disable-line react-hooks/exhaustive-deps   


const formatDate = (date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
}
    console.log(diary)
    console.log(todayDiaryId)
    console.log(message)
    //return null;
  return (
        <div>  
            
            {diary && <div className = "diary-details"> 
                                             
                <div className='mealPlans-container container'> 
                    <h1 className='mealPlan-title'>{`${formatDate(diary.createdAt)}, ${diary.calories} kcal`} </h1>
                        {
                            diary.MealEntries.map((meal, mealIndex)=>{
                                return(
                                    <div className = 'meals-container' key = {mealIndex}>
                                            <h2 className="mealtype">{meal.type}
                                                {todayDiaryId == diary.id && 
                                                    <Link to = {`/createEntry/${diaryId}/${meal.type}`}>
                                                        <button className="add-btn" ><FontAwesomeIcon icon={faAdd} /></button>
                                                    </Link>
                                                }
                                            </h2>
                                            {
                                               todayDiaryId == diary.id ?  <MealTable Food = {meal.Food} id = {todayDiaryId} mealEntryId = {meal.id} ></MealTable> : <MealTable Food = {meal.Food}></MealTable>
                                            }
                                            
                                    </div>
                                )
                            })
                        }
                </div>
            </div> } 

            {
                status && 
                <div className='error-container container'>
                   <h2>{message.message} </h2>
                   <Link to = {"/"}>
                        <button className='btn'>Home</button>
                   </Link>
                </div>
            }
        </div>
  )
}



export default DiaryDetails
