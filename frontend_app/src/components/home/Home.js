import React, {useEffect, useState} from "react";
import VerifyTokenService from "../../services/verifyTokenService";
import WeightLog from "../../services/userLogService";
import './Home.scss'
import {Line, Bar, Chart} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import {UserData} from './Data';
const Home = ({history}) => {

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [],
  }); 

  const [user, setUser] = useState('');
  useEffect(()=>{
      VerifyTokenService.verify(history).then((res) => setUser(res))  
    },[]); // eslint-disable-line react-hooks/exhaustive-deps    
   
    useEffect(() =>{
      WeightLog.getUserLogs().then((res) => {
        let userLogData = {
          labels: res.data.map((entry) => {
            let newDate = new Date(entry.createdAt);
            return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
          }),
          datasets:[{
            label: "Your weight",
            data: res.data.map((entry) => entry.weight),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',

          }]
        }
        setUserData(userLogData)
        console.log(userLogData)
      });
    }, [])
    
   

//if(!user) return <Redirect push to="/login" />
  return (
  <div id = "homepage">
   
        <div id = 'welcome-message'>
            <h1>Welcome, </h1>
            <h1>{user.firstName} {user.lastName}</h1>  
        </div>
        <div id="weight-history" >
          <Line
          data={userData}
          options = {
            {responsive:true,}
          }
          
          />
        </div>
       
  </div>
  );
};
export default Home;
