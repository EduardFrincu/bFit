import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import PredictiveInput from '../mealPlans/PredictiveInput';
import DiaryService from '../../services/DiaryService';
import { faTrash, faAdd, faArrowRightLong, faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VerifyTokenService from "../../services/verifyTokenService";


const CreateEntry = ({history}) => {
    const [diaryId, setDiaryId] = useState();
    const [inputList, setInputList] = useState([{food: "", qty: ""}]);
    const [checkIfTodayPlan, setCheckIfTodayPlan] = useState();
    const params = useParams();
    
    useEffect(()=>{
		VerifyTokenService.verify(history)

		DiaryService.createDiary(null,history)
		.then((res) =>{
			setDiaryId(res.data.id);
            setCheckIfTodayPlan((res.data.id == params.id));		
	})
   
	
	},[]); // eslint-disable-line react-hooks/exhaustive-deps  

    const updateInputListFood = (value, index) =>{
        const list = [...inputList];
        list[index]['food'] = value;
        setInputList(list);
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleAddClick = () =>{
        setInputList([...inputList, {food: "", qty: ""}]);

        
    }
    const handleRemoveClick = index =>{
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        
    }
    const id = params.id;
    const type = params.type

  return (
    
    
    <div id = "page" >
        {
            checkIfTodayPlan == undefined ? <div></div> :
        
            checkIfTodayPlan ?
        <div id = "insert-meal-log">
            <h3 className='text-center'>Tell us what do you want for {params.type}</h3>
            <div className = 'meal-container'>
        
        { inputList.map((element,index) =>{
                return(
                    <div className = "food-qty" key = {index}>
                        <PredictiveInput name = "food" index = {index} updateInputListFood = {updateInputListFood}/>
                        <input type='text' className='form-control qty-input ' name='qty' value = {element.qty} placeholder='Quantity' 
                            tabIndex={index} 
                            onChange={e => handleInputChange(e,index)} 
                            key = {index}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                                }} />
                        {inputList.length > 1 && <button className="remove-btn" onClick={() => handleRemoveClick(index)}><FontAwesomeIcon icon={faTrash} /></button>}
                        
                        <div className="btn-box">
                        {inputList.length - 1 === index && (inputList.at(-1).food !== '' && inputList.at(-1).qty !== '') && <button className = "add-btn" onClick={handleAddClick}><FontAwesomeIcon icon={faAdd} /> Add</button>}
                        </div>
                    </div>)
            }) 
        }
            <div className='ok'>
                {inputList.at(-1).food !== '' && inputList.at(-1).qty !== '' && 
                <button className = "btn btn-success btn-block step-btn finish-btn" onClick={() => DiaryService.createEntryLog({diaryId:id, type, foods: inputList}, history)}>Submit</button>}
            </div>
            </div>
            
    </div> 
    :
    <div className='container'>
        <div className='container'>
            nu i ok sefule aicea
        </div>
    </div>
}
    </div>
    
  )
    
}

export default CreateEntry
