import React, { useState } from "react";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
// import Navbar from "./components/navbar";
import Nbar from "./components/navbar/Navbar";
import Register from "./components/auth/Register";
import MealPlanCreate from "./components/mealPlans/MealPlanCreate";
import viewMealPlans from "./components/mealPlans/ViewMealPlans";
import MealPlanSuggestion from "./components/mealPlans/MealPlanSuggestion";
import BMR from "./components/BMRCalculator/BMRCalculator";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.scss";
import TodayDiary from "./components/diary/TodayDiary";
import CreateEntry from "./components/diary/CreateEntry";
import DiaryDetails from "./components/diary/DiaryDetails";
import DiaryHistory from "./components/diary/DiaryHistory";
import Cookies from 'universal-cookie';

let cookie = new Cookies().get('token');

function App() {

  return (
    <Router>
      <div className="App">
       {cookie && <Nbar/>} 
        <Switch>
          {/* <Route exact path="/nav" component={Navbar} /> */}
          
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/mealPlan" component={MealPlanCreate} />
          <Route path="/viewMealPlans" component={viewMealPlans} />
          <Route path="/BMR" component={BMR} />
          <Route path="/mealPlanSuggestion" component={MealPlanSuggestion} />
          <Route path="/todayDiary" component={TodayDiary} />
          <Route path="/createEntry/:id/:type" component={CreateEntry} />
          <Route path="/diaryDetails/:diaryId" component={DiaryDetails} />
          <Route path="/diaryHistory" component={DiaryHistory} />
          <Route render={() => <h1> 404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
