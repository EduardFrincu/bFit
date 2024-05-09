import React, { useState, useEffect} from 'react'
import API from '../../services/api';
function PredictiveInput(props) {
    const [foods, setFoods] = useState([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() =>{
        const loadFoods = async() => {
          const response = await API.get('/api/foods');
          setFoods(response.data);
          
      }
      loadFoods();
    }, []);

    const onChangeHandler = (text) =>{
        let matches = [];
        if(text.length > 0){
            matches = foods.filter(food => {
                const regex = new RegExp(`${text}`, "gi");
                return food.name.match(regex);
                 
            })
        }
        setSuggestions(matches);
        setText(text)
        
    }
    const onSuggestHandler = (text) => {
        setText(text);
        updateInputListFood(text, props.index)
        setSuggestions([]);
    }
    // console.log(text);
    const updateInputListFood = (text, i) => {
      props.updateInputListFood(text,i);
    }
  return (
    <>
      <input type = "text" name={props.name} className='form-control food-input' placeholder='Food'
        onChange={e => onChangeHandler(e.target.value)} 
        value = {text}
        onBlur = {() => {
            setTimeout(() => {
                setSuggestions([]);
            }, 100)
        }}
        />
        <div className='suggestions'>
      {suggestions && suggestions.slice(0,600).map((suggestion,i) => <ul className = "suggestion" key = {i} onClick = {() => onSuggestHandler(suggestion.name)}> {suggestion.name}</ul>)}
      </div>
      {}
    </>
  )
}

export default PredictiveInput
