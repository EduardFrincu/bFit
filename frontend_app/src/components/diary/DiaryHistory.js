import React, {useEffect, useState} from 'react'
import {buildStyles, CircularProgressbar, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DiaryService from '../../services/DiaryService';

import VerifyTokenService from '../../services/verifyTokenService';
import Card from './Card';
import { Link } from 'react-router-dom';
const DiaryHistory = ({history}) => {

    const [intake, setIntake] = useState();
    const [diaryHistory, setDiaryHistory] = useState();
    const [macros, setMacros] = useState();

    useEffect(()=>{
		VerifyTokenService.verify(history)
		.then((res) =>{
			//setIntake(res.intake)
            console.log(res.intake)
		})
		DiaryService.getDiaryHistory(history)
		.then((res) =>{
            console.log(res.data)
			setDiaryHistory(res.data);
			
	})	
	},[]); 
    console.log(diaryHistory)
    

  return (
    <div id = "history">
        <div className='history-container'>
            {diaryHistory && 

                diaryHistory.map((element,index)=>{
                    return(
                       <Link key = {index} to = {`/diaryDetails/${element.id}`}>
                        <Card element = {element} history ={history}> </Card>
                    </Link>
                    )
                    })
            }
        </div>
    </div>
    
  )
}

export default DiaryHistory
