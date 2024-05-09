import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleInfo, faMars, faVenus} from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import BMRCalculatorService from '../../services/BMRCalculatorService';
import './BMRCalculator.scss';
import Cookies from 'universal-cookie';
function BMRCalculator() {
const [weight, setWeight] = useState(1);
const [height, setHeight] = useState(1);
const [age, setAge] = useState(1);
const [gender, setGender] = useState("Male");
const [activity, setActivity] = useState("");
const [BMR, setBMR] = useState(0);
const [intake, setIntake] = useState(1);
const [goal, setGoal] = useState();

const BMR_Harris_Benedict = (weight,height,age,gender,activity) =>{
  let value;
  if(gender === 'Male'){
    value = 66 + 13.7 * weight + 5 * height -6.8 * age; 
  }
  else if (gender === 'Female'){
    value = 655 + 9.6 * weight + 1.8 * height -4.7 * age;
  }
  setBMR(Math.round(value*activity.value));

}

const newIntake = (BMR, goal) =>{
  if(goal == 1){
      return BMR + 850  //1kg per week
    }
    else if(goal == 2){
      return BMR - 1000 //1kg per week
    }
    else if (goal == 0){
      return BMR;
    }
  
}
const options = [
  { value: 1.2, label: 'Sedentary (little or no exercise, desk job)' },
  { value: 1.375, label: 'Lightly active (exercise 1-3 days/week)' },
  { value: 1.55, label: 'Moderately active (exercise 6-7 days/week)' },
  { value: 1.725, label: 'Very active (exercise every day, or exercising 2 times/day) ' },
  { value: 1.9, label: 'Extra active (exercise more than 2 times/day)' }
  
]

const goalOptions = [
  { value: 0, label: 'Maintain weight'},
  { value: 1, label: 'Muscle gain (1kg/week)' },
  { value: 2, label: 'Fat loss (1kg/week)' },

  
]

useEffect(() =>{
  BMRCalculatorService.getUserInfo()
  .then((res)=>{
    setWeight(res.data.weight);
    setHeight(res.data.height);
    setAge(res.data.age);
    setGender(res.data.gender);
    setIntake(res.data.intake);
    setGoal(res.data.goal);
    console.log(goal) 
    console.log(intake)
  })
},[]);

useEffect(() => {
  BMR_Harris_Benedict(weight,height,age,gender,activity)
  let newintake = newIntake(BMR,goal);
  setIntake(newintake);
}, [weight,height,age,gender,activity,BMR, goal]);

const updateUserProfile = () =>{
  BMRCalculatorService.updateProfile({age,height,weight,gender, intake, goal})
  .then((res) => console.log(res));
}

  return (
    <div>
      <h1> Update your personal data</h1>
      <div className='container'>

        <div className='label-container'><p>Age:</p></div>
        <div id = "weight-option" className='option'> 
        
          <input 
            type="range" 
            placeholder='CM'
            min="1" max="100"
            className="slider" id="age-range"
            value={age}
            onChange = {e => setAge(e.target.value)}
          />
          <input
            type = "text"
            className='form-input'
            value = {age}
            onChange = {e => setAge(e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
              }}
          />
          <div className='tooltip'>
            <FontAwesomeIcon icon={faCircleInfo} />
            <span className='tooltip-text'>years</span>
          </div>
          
        </div>


        <div className='label-container'><p>Weight:</p></div>
        <div id = "weight-option" className='option'> 
        
          <input 
            type="range" 
            placeholder='CM'
            min="1" max="180"
            className="slider" id="weight-range"
            value={weight}
            onChange = {e => setWeight(e.target.value)}
          />
          <input
            type = "text"
            className='form-input'
            value = {weight}
            onChange = {e => setWeight(e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
              }}
          />
          <div className='tooltip'>
            <FontAwesomeIcon icon={faCircleInfo} />
            <span className='tooltip-text'>kg</span>
          </div>
        </div>

        <div className='label-container'><p>Height:</p></div>
        <div id = "height-option" className='option'> 
          
          <input 
            type="range" 
            placeholder='CM'
            min="50" max="210"
            className="slider" id="weight-range"
            value = {height}
            onChange = {e => setHeight(e.target.value)}
          />
          <input
            type = "text"
            className='form-input'
            value = {height}
            onChange = {e => setHeight(e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
              }}
          />
          <div className='tooltip'>
            <FontAwesomeIcon icon={faCircleInfo} />
            <span className='tooltip-text'>cm</span>
          </div>

        </div>

        <div className='label-container'><p>Gender:</p></div>
        <div id = "gender-option" className='option' > 
          <label>
            <input type="radio" value="Male" name="gender" className='gender-radio' onChange={e => setGender(e.target.value)} checked = {gender === 'Male'} />
            <FontAwesomeIcon icon={faMars} className="gender"/>
          </label>
          <label>
            <input type="radio" value="Female" name="gender" className='gender-radio' onChange={e => setGender(e.target.value)} checked = {gender === 'Female'}/>
            <FontAwesomeIcon icon={faVenus} className="gender" />
          </label>
        </div>
        
        <div className='label-container'><p>Activity level:</p></div>
        <div id = "activity-option" className='option' > 
          <Select options={options}  
                  onChange={(option) => setActivity(option)} 
                  menuColor = 'red' 
                  theme = {(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#417D7A',
                              primary50: '#417D7A',
                              primary: '#417D7A',
                    },
                  })}/> 
        </div>
        
        {
          
          BMR > 0 &&  <p className='info-strings'>You need {BMR} kcal/day to maintain your weight</p> 
        }
        <div className='label-container'><p>Set up your goal:</p></div>
        <div id = "goal-option" className='option' > 
          <Select options={goalOptions}  
                  onChange={(option) => setGoal(option.value)} 
                  menuColor = 'red' 
                  theme = {(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#417D7A',
                              primary50: '#417D7A',
                              primary: '#417D7A',
                    },
                  })}/> 
        </div>

        {
          intake > 0 && <p className='info-strings'> To achieve your goal you should eat {intake} kcal </p>
        }
        
        {
          new Cookies() .get('token') && weight && height && age && gender && activity && BMR && 
          <button className='update-btn' onClick={() => updateUserProfile()}>Update</button>
          
        }

      </div>
    </div>
  )
}

export default BMRCalculator
