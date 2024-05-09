import React, {Fragment, useState, useEffect} from 'react';
import StepWizard from 'react-step-wizard';
import './MealPlan.scss';
import VerifyTokenService from "../../services/verifyTokenService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PredictiveInput from "./PredictiveInput";
import { faTrash, faAdd, faArrowRightLong, faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import MealPlanService from '../../services/mealPlanService';
import {useHistory} from 'react-router-dom';



const MealPlanCreate = ({history}) =>{

    useEffect(()=>{
        VerifyTokenService.verify(history)
      },[]); // eslint-disable-line react-hooks/exhaustive-deps   

    // const [state,setState] = useState({
    //     formData:{
    //         "breakfast":[],
    //         "lunch":[],
    //         "dinner": [],
    //     },
    //     // transitions:{
    //     //     enterRight: 'your custom css transition classes',
    //     //     enterLeft : 'your custom css transition classes',
    //     //     exitRight : 'your custom css transition classes',
    //     //     exitLeft  : 'your custom css transition classes',
    //     //     intro     : 'your custom css transition classes'
    //     // },

    // });

    const [data, setData] = useState({});
    const [step, setStep] = useState(0);
    
    const updateFormData = (food, hashKey) => {
        const meal = data;
        meal[hashKey] = food;
        setData( meal);        
    }

    const updateStep = (newStep) => {
        setStep(newStep);
    }

    return(
        <div className='page-content'>
            <div id = "progress-bar">
                <ProgressBar
                    percent={step}
                    filledBackground="linear-gradient(90deg, rgba(6,147,163,1) 0%, rgba(113,186,183,1) 53%)"
                >
                    <Step transition="scale">
                        {({ accomplished, index }) => (
                            <div 
                                className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                style = {{
                                            padding: `13px`,
                                            fontSize: "22px",
                                            filter: `grayscale(${accomplished ?  "0" : "70%" }`,
                                            backgroundColor: "#417D7A",
                                            borderRadius : "5px",
                                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                            color:'white'
                                                }}
                            >
                                {index + 1}
                            </div>
                        )}
                    </Step>
                    <Step transition="scale">
                    {({ accomplished, index}) => (
                        <div 
                            className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                            style = {{
                                        padding: `13px`,
                                        fontSize: "22px",
                                        filter: `grayscale(${accomplished ?  "0" : "70%" }`,
                                        backgroundColor: "#417D7A",
                                        borderRadius : "5px",
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                        color:'white'
                                    }}
                            >
                            {index + 1}
                        </div>
                    )}
                    </Step>
                    <Step transition="scale">
                    {({ accomplished, index}) => (
                        <div 
                            className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                            style = {{
                                        padding: `13px`,
                                        fontSize: "22px",
                                        filter: `grayscale(${accomplished ?  "0" : "70%" }`,
                                        backgroundColor: "#417D7A",
                                        borderRadius : "5px",
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                        color:'white'
                                    }}
                            >
                            {index + 1}
                        </div>
                    )}
                    </Step>
                    <Step transition="scale">
                        {({ accomplished, index }) => (
                            <div 
                                className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                                style = {{
                                            padding: `13px`,
                                            fontSize: "22px",
                                            filter: `grayscale(${accomplished ?  "0" : "70%" }`,
                                            backgroundColor: "#417D7A",
                                            borderRadius : "5px",
                                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                            color:'white'
                                                }}
                            >
                                {index + 1}
                            </div>
                        )}
                    </Step>
                </ProgressBar>
            </div>
            
            <StepWizard isHashEnabled= {true}>
                <Name hashKey = {"name"} update = {updateFormData} updateStep = {updateStep}></Name>
                <BreakFast hashKey = {"breakfast"} update = {updateFormData} updateStep = {updateStep}/>
                <Lunch hashKey = {"lunch"} update = {updateFormData} updateStep = {updateStep}/>
                <Dinner hashKey = {"dinner"} update = {updateFormData} data = {data} updateStep = {updateStep}/>
            </StepWizard>
        {/* <button className='btn btn-success btn-block' onClick={console.log("SUBMIT")}>Finish</button> */}
        </div>

    );

}

export default MealPlanCreate;

const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
    data,
    updateStep,
    
}) => {

    let history = useHistory();
    
    return(
    <div>
        
        { currentStep > 1 &&
            <button className='btn btn-default btn-block step-btn' onClick={previousStep}><FontAwesomeIcon icon={faArrowLeftLong}/></button>
        }
        { currentStep < totalSteps ?
            <button className='btn btn-primary btn-block step-btn' onClick={nextStep}><FontAwesomeIcon icon={faArrowRightLong} /></button>
            :
            <button className='btn btn-success btn-block step-btn finish-btn' onClick={ () => MealPlanService.create(data,history)}>Finish</button>
            
        }
        
    </div>

    
)};
const Name = props =>{

    const [name, setName] = useState('');
    const update = () => {
        props.update(name, props.hashKey);
                
    };

    useEffect(() =>{
        props.updateStep((props.currentStep-1)*33.3333333333333333)
        return () => { update()}
    });

    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setName(list);
    // };
    
    return(
    <div>
        <h3 className='text-center'>Give your meal plan a name</h3>
        <div className = 'meal-container'>
                
        <div className = "food-qty">
            <input type='text' className='form-control name-input' name='name' placeholder='Name' onChange={e => setName(e.target.value)} />
            {/* {update()} */}
        </div>
        

        {name && <Stats step={1} {...props} />}
        </div>
    </div>
    );
}
const BreakFast = props =>{

    const [inputList, setInputList] = useState([{food: "", qty: ""}]);
    const update = () => {
        props.update(inputList, props.hashKey);
        
                
    };
    useEffect(() =>{
        //props.updateStep((props.currentStep-1)*33.34)
        return () => { update()}
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const updateInputListFood = (value, index) =>{
        const list = [...inputList];
        list[index]['food'] = value;
        setInputList(list);
    }

    const handleAddClick = () =>{
        setInputList([...inputList, {food: "", qty: ""}]);

        
    }
    const handleRemoveClick = index =>{
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        
    }
    
    return(
    <div>
        <h3 className='text-center'>Tell us what do you want for breakfast</h3>
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
                        {inputList.length > 1 && <button className="remove-btn" onClickCapture ={update()} onClick={() => handleRemoveClick(index)}><FontAwesomeIcon icon={faTrash} /></button>}
                        {/* {update()} */}
                        <div className="btn-box">
                        {inputList.length - 1 === index && (inputList.at(-1).food !== '' && inputList.at(-1).qty !== '') && <button className = "add-btn" onClick={handleAddClick}><FontAwesomeIcon icon={faAdd} /> Add</button>}
                        </div>
                    </div>)
        }) }

        <Stats step={2} {...props} />
        </div>
    </div>
    );
}

const Lunch = props =>{
    const [inputList, setInputList] = useState([{food: "", qty: ""}]);

    const update = () => {
        props.update(inputList, props.hashKey);
                
    };
    useEffect(() =>{
        //props.updateStep((props.currentStep-1)*33.34)
        return () => { update()}
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const updateInputListFood = (value, index) =>{
        const list = [...inputList];
        list[index]['food'] = value;
        setInputList(list);
    }

    const handleAddClick = () =>{
        setInputList([...inputList, {food: "", qty: ""}]);

        
    }
    const handleRemoveClick = index =>{
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        
    }    

    return(
    <div>
        <h3 className='text-center'>Tell us what do you want for lunch!</h3>
        <div className = 'meal-container'>
        
        { inputList.map((element,index) =>{
                return(
                    <div className = "food-qty" key = {index}>
                        <PredictiveInput name = "food" index = {index} updateInputListFood = {updateInputListFood}/>
                        <input type='text' className='form-control qty-input' name='qty' value = {element.qty} placeholder='Quantity' 
                            tabIndex={index} 
                            onChange={e => handleInputChange(e,index)} 
                            key = {index}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                                }} />
                        {inputList.length > 1 && <button className="remove-btn" onClickCapture ={update()} onClick={() => handleRemoveClick(index)}><FontAwesomeIcon icon={faTrash} /></button>}
                        {/* {update()} */}
                        <div className="btn-box">
                            {inputList.length - 1 === index && (inputList.at(-1).food !== '' && inputList.at(-1).qty !== '') && <button className = "add-btn" onClick={handleAddClick}><FontAwesomeIcon icon={faAdd} /> Add</button>}
                        </div>
                    </div>)
        }) }

        <Stats step={3} {...props} />
        </div>
    </div>
    );
}

const Dinner = props =>{
    const [inputList, setInputList] = useState([{food: "", qty: ""}]);

    const update = () => {
        props.update(inputList, props.hashKey);
        
    };
    useEffect(() =>{
        //props.updateStep(Math.round((props.currentStep-1)*33.34))
        return () => { update()}
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const updateInputListFood = (value, index) =>{
        const list = [...inputList];
        list[index]['food'] = value;
        setInputList(list);
    }

    const handleAddClick = () =>{
        setInputList([...inputList, {food: "", qty: ""}]);

        
    }
    const handleRemoveClick = index =>{
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        
    }
    
    return(
    <div>
        <h3 className='text-center'>Tell us what do you want for dinner!</h3>
        <div className = 'meal-container'>
        
        { inputList.map((element,index) =>{
                return(
                    <div className = "food-qty" key = {index}>
                        <PredictiveInput name = "food" index = {index} updateInputListFood = {updateInputListFood}/>
                        <input type='text' className='form-control qty-input' name='qty' value = {element.qty} placeholder='Quantity' 
                            tabIndex={index} 
                            onChange={e => handleInputChange(e,index)}
                            key = {index} 
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                                }}/>
                        {inputList.length > 1 && <button className="remove-btn" onClickCapture ={update()} onClick={() => handleRemoveClick(index)}><FontAwesomeIcon icon={faTrash} /></button>}
                        {/* {update()} */}
                        <div className="btn-box">
                            {inputList.length - 1 === index && (inputList.at(-1).food !== '' && inputList.at(-1).qty !== '') && <button className = "add-btn" onClick={handleAddClick}><FontAwesomeIcon icon={faAdd} /> Add</button>}
                        </div>
                    </div>)
        }) }

        <Stats step={4} {...props} />
        </div>
    </div>
    );
}