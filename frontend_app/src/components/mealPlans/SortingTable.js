import React, {useState, useMemo} from 'react';
import { faTrash, faAdd, faArrowRightLong, faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DiaryService from '../../services/DiaryService';
import { useHistory } from "react-router-dom";
const useSortableData = (items, configuration = null) =>{
    const [sortConfig, setSortConfig] = useState(configuration);

    const sortedItems = useMemo(() =>{
        let itemsToBeSorted = [...items];
        if(sortConfig !==null){
            itemsToBeSorted.sort((a,b) =>{

                if(sortConfig.fieldName !=='name'){
                    if( a[sortConfig.fieldName]*a.grams/100 > b[sortConfig.fieldName]*b.grams/100){

                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    else if (a[sortConfig.fieldName]*a.grams/100 < b[sortConfig.fieldName]*b.grams/100){
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                }
                else{
                    if( a[sortConfig.fieldName] > b[sortConfig.fieldName]){

                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    else if (a[sortConfig.fieldName] < b[sortConfig.fieldName]){
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                }
                
                return 0;
            });
        }
        return itemsToBeSorted;
    }, [items,sortConfig]);

    const requestSortBy = fieldName =>{
        let direction = 'ascending';

        if(sortConfig && sortConfig.fieldName === fieldName && sortConfig.direction === 'ascending'){
            direction = 'descending'
        }
        setSortConfig({fieldName, direction});
    } 

    return {items: sortedItems, requestSortBy, sortConfig};
}

const MealTable = (props) =>{
    const {items, requestSortBy, sortConfig} = useSortableData(props.Food);
    const history = useHistory()
    const updateClassNamesFor = (className) =>{
        if(!sortConfig){
            return;
        }
        return sortConfig.fieldName === className ? sortConfig.direction : undefined;
    };
const getTotalForKey = (key) => {
    let sum = 0;
    items.map((element)=>{
        sum += element[key]* element.grams/100;
    })
    return parseFloat(sum).toFixed(2);
}

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <button type = "button"
                                onClick={() =>requestSortBy('name')}
                                className = {updateClassNamesFor('name')}
                        >
                            Name
                        </button>
                    </th>
                    <th>
                        <button type = "button"
                                onClick={() =>requestSortBy('caloriesPer100g')}
                                className = {updateClassNamesFor('caloriesPer100g')}
                        >
                            Calories
                        </button>
                    </th>
                    <th>
                        <button type = "button"
                                onClick={() =>requestSortBy('carbohydrates')}
                                className = {updateClassNamesFor('carbohydrates')}
                        >
                            Carbohydrates
                        </button>
                    </th>
                    <th>
                        <button type = "button"
                                onClick={() =>requestSortBy('fats')}
                                className = {updateClassNamesFor('fats')}
                        >
                            Fats
                        </button>
                    </th>
                    <th>
                        <button type = "button"
                                onClick={() =>requestSortBy('proteins')}
                                className = {updateClassNamesFor('proteins')}
                        >
                            Proteins
                        </button>
                    </th>
                    <th>
                        <button type = "button"
                                onClick={() =>requestSortBy('fibers')}
                                className = {updateClassNamesFor('fibers')}
                        >
                            Fibers
                        </button>
                    </th>
                    <th>
                        <button type = "button"
                                onClick={() =>requestSortBy('grams')}
                                className = {updateClassNamesFor('grams')}
                        >
                            Grams
                        </button>
                    </th>
                    {/* {props.id && 
                        <th>
                           <p style={{fontWeight: 100 }}>Delete </p>
                        </th>
                    } */}
                    
                </tr>
            </thead>
            <tbody>
                {items.map((item) => {
                    console.log(item)
                    return(
                        <tr key = {item.id}>
                            <td>{item.name} 
                            {props.id && 
                                    <button className='delete-btn' 
                                    onClick={()=>{DiaryService.deleteDiaryLog({foodId:item.id, mealEntryId: props.mealEntryId}, history)}}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                }
                            </td>
                            <td>{parseFloat((item.caloriesPer100g * item.grams)/100).toFixed(2)}</td>
                            <td>{parseFloat((item.carbohydrates * item.grams)/100).toFixed(2)}</td>
                            <td>{parseFloat((item.fats * item.grams)/100).toFixed(2)}</td>
                            <td>{parseFloat((item.proteins * item.grams)/100).toFixed(2)}</td>
                            <td>{parseFloat((item.fibers * item.grams)/100).toFixed(2)}</td>
                            <td>{item.grams}</td>
                            
                        </tr>
                        
                    )
                })}
                <tr id = "totalsRow">
                    <td><b>Total</b></td>
                    <td>{getTotalForKey('caloriesPer100g')}</td>
                    <td>{getTotalForKey('carbohydrates')}</td>
                    <td>{getTotalForKey('fats')}</td>
                    <td>{getTotalForKey('proteins')}</td>
                    <td>{getTotalForKey('fibers')}</td>
                    <td>-</td>

                </tr>
            </tbody>
        </table>
    )
}
export default MealTable