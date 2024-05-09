import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

let cookie = new Cookies().get('token');

// export let MenuItems = [{
//     title: "Update profile",
//     url:"/BMR",
//     cName: "nav-links",

// },
// {
//     title: "Diary",
//     url:"/todayDiary",
//     cName: "nav-links",

// },
// {
//     title: "Suggestion",
//     url:"/mealPlanSuggestion",
//     cName: "nav-links",

// },
// {
//     title: "Diary History",
//     url:"/diaryHistory",
//     cName: "nav-links",

// },
// {
//     title: "View your meal plans",
//     url:"/viewMealPlans",
//     cName: "nav-links",

// },
// {
//     title: "Log out",
//     url:"/login",
//     cName: "nav-links-mobile",
//     onClick: () => {new Cookies().remove('token')}

// },
// ];
// export let MenuItemsRole1 = [
//     {
//         title: "Update profile",
//         url:"/BMR",
//         cName: "nav-links",

//     },
//     {
//         title: "Create a meal Plan",
//         url:"/mealPlan",
//         cName: "nav-links",

//     },
//     {
//         title: "View your meal plans",
//         url:"/viewMealPlans",
//         cName: "nav-links",

//     },
//     {
//         title: "Diary",
//         url:"/todayDiary",
//         cName: "nav-links",

//     },
//     {
//         title: "Diary History",
//         url:"/diaryHistory",
//         cName: "nav-links",

//     },
//     {
//         title: "Log out",
//         url:"/login",
//         cName: "nav-links-mobile",
//         onClick: () => {new Cookies().remove('token')}

//     },

// ];
export let MenuItems = [];
if(cookie){
    let user = jwt_decode(cookie);
    console.log(user);
    if(user.role == 0) {
        MenuItems.push(
        {
            title: "Update profile",
            url:"/BMR",
            cName: "nav-links",
    
        },
        {
            title: "Diary",
            url:"/todayDiary",
            cName: "nav-links",
    
        },
        {
            title: "Suggestion",
            url:"/mealPlanSuggestion",
            cName: "nav-links",
    
        },
        {
            title: "Diary History",
            url:"/diaryHistory",
            cName: "nav-links",
    
        },
        {
            title: "View your meal plans",
            url:"/viewMealPlans",
            cName: "nav-links",
    
        },
        {
            title: "Log out",
            url:"/login",
            cName: "nav-links-mobile",
            onClick: () => {new Cookies().remove('token'); window.location.reload(false);}
    
        },
        )
    }
    else if(user.role == 1){
        MenuItems.push(    
        {
            title: "Update profile",
            url:"/BMR",
            cName: "nav-links",
    
        },
        {
            title: "Create a meal Plan",
            url:"/mealPlan",
            cName: "nav-links",
    
        },
        {
            title: "View your meal plans",
            url:"/viewMealPlans",
            cName: "nav-links",
    
        },
        {
            title: "Diary",
            url:"/todayDiary",
            cName: "nav-links",
    
        },
        {
            title: "Diary History",
            url:"/diaryHistory",
            cName: "nav-links",
    
        },
        {
            title: "Log out",
            url:"/login",
            cName: "nav-links-mobile",
            onClick: () => {new Cookies().remove('token'); window.location.reload(false);}
    
        },
    )} 
}
