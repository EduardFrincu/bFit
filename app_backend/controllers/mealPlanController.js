const { Sequelize, sequelize } = require('../models');
const {Op} = require("sequelize");
const user = require('../models/user');
const MealPlan = require('../models').MealPlan;
const Meal = require('../models').Meal;
const User = require('../models').User;
const Food = require('../models').Food;
const Food_Meal = require('../models').Food_Meal;
const MealPlans_User = require('../models').MealPlans_User;
exports.createMealPlan = async (req,res) => {
    
    const userid = req.user.id;
    const mealPlanName = req.body.name;
    const date = Sequelize.fn('NOW');
    console.log(Sequelize.literal('NOW'))
    let calories = 0;
    const plan = await MealPlan.create({
        name: mealPlanName,
        date: date
    })
    let meals = Object.keys(req.body);
    let name = meals.splice(0,1);
    console.log(meals);
    
    for (const elem of meals){
        let meal = await Meal.create({
            mealPlanId: plan.id,
            type: elem
        })
        

        for(const foodElement of req.body[elem]){
            let foodId = await Food.findOne({
                where:{
                    name: foodElement.food 
                } 
            })

            let alreadyLoggedFood = await Food_Meal.findOne({
                where:{
                    FoodId: foodId.id,
                    MealId: meal.id
                }
            })
            if(alreadyLoggedFood){
                let updateLoggedFood = await Food_Meal.update(
                    {grams: parseInt(foodElement.qty) + parseInt(alreadyLoggedFood.grams)},
                    {where:{
                        FoodId: alreadyLoggedFood.FoodId,
                        MealId: alreadyLoggedFood.MealId
                    }}
                )
            }
            else{
                let fm =  await Food_Meal.create({
                    MealId: meal.id,
                    FoodId: foodId.id,
                    grams: foodElement.qty
                })
                
            }
            calories += foodId.caloriesPer100g*foodElement.qty/100
            
            //console.log(fm);

        }
        
    }  
    let insertCalories = await MealPlan.update(
        {calories: parseInt(calories)},
        {where:{
            id: plan.id
        }}
    )
    
    const mealPlanUser = await MealPlans_User.create({
        MealPlanId: plan.id,
        UserId: userid
    })
        console.log(calories);
        
   

    return res.send(plan);
}

exports.deleteMealPlanById = async (req,res) =>{
    let {mealPlanId} = req.params;
    try {
        const deletedMeals = await MealPlans_User.destroy({
            where: {
                MealPlanId: mealPlanId
            }
        })

       
     return res.status(200).json({message: `The plan with id ${mealPlanId} was deleted for user with id = ${req.user.id}.`});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
}
exports.saveMealPlan = async(req,res) => {

    let userid = req.user.id;
    let mealPlanId = req.body.id;
    

    let existingMealPlan = await MealPlans_User.findOne({
        where:{
            MealPlanId: mealPlanId,
            UserId: userid
        }
    })
    if(!existingMealPlan){
        let mealPlan = await MealPlans_User.create({
        MealPlanId: mealPlanId,
        UserId: userid
        })
    return res.send(mealPlan);
    }
    else return res.status(400).json({message: "You should not be allowed to do this"});

}

exports.getMealPlansByUserId = async (req,res) =>{

        console.log(req.headers)
        let mealPlans = await MealPlan.findAll({
            attributes:['id', 'createdAt', 'name'],
            include: 
            [
                {
                    model:User,
                    attributes: ['id'],
                    where:{id: req.user.id}
                },
                { 
                  model: Meal, 
                  attributes: ['id', 'mealPlanId', 'type'],
                  required: true,
                  include: {model:Food, required: true}
                }  
            
            ]   
            })

            mealPlans.forEach(mealPlan => {
                let calories = 0;
                mealPlan.Meals.forEach(meal =>{
                    meal.Food.forEach(food =>{
                        food.dataValues.grams = ~~food.Food_Meal.grams;
                        calories += food.dataValues.grams * food.dataValues.caloriesPer100g /100;
                    })  
                })
                mealPlan.dataValues.calories = Math.round(calories);
            });
   
        return res.send(mealPlans)
    
}
exports.getMealPlanByCalories = async(req,res) =>{
    let intake = req.user.intake;
    let assignedMealPlansIds = await MealPlan.findAll({
        attributes: ['id'],
        include:{
            model:User,
            required: true,
            where:{
                id: req.user.id
            }
        }
    })
    // return res.send(assignedMealPlansIds)
    let assignedIds = [];
    assignedMealPlansIds.forEach(elem =>{
        assignedIds.push(elem.id);
    })

    console.log(assignedIds);
    let mealPlanL = await MealPlan.findOne({
        attributes:['id', 'createdAt', 'name', 'calories'],
        where: {
            id: {
                [Op.notIn]: assignedIds
            },
            calories: {
                [Op.lte]: intake
            }
        },
        order:[ ['calories', 'DESC']],
        include: 
            [
               
                { 
                    model: Meal, 
                    required: true,
                    include: {model:Food, required: true}
                } 
        ]    
        })

        let mealPlanH = await MealPlan.findOne({
            
            attributes:['id', 'createdAt', 'name', 'calories'],
            where: {
                id: {
                    [Op.notIn]: assignedIds
                },
                calories: {
                    [Op.gte]: intake
                }
            },
            order:[ ['calories', 'ASC']],
            include: 
                [
                   
                    { 
                        model: Meal, 
                        required: true,
                        include: {model:Food, required: true}
                    } 
            ]    
            })
        let planToBeReturned;
        if(mealPlanL && mealPlanH){
            if((mealPlanH.calories - intake) < (intake-mealPlanL.calories)){
                planToBeReturned = mealPlanH;
            }
            else{
                planToBeReturned = mealPlanL;
                }
        }
        else if(!mealPlanL && !mealPlanH) return res.status(404).json({message: "Looks like there is no plan for you. Sorry"});
        else if(!mealPlanH && mealPlanL) planToBeReturned = mealPlanL;
        else if(mealPlanH && !mealPlanL) planToBeReturned = mealPlanH;
    
        if(planToBeReturned.calories < 0.9* intake){
            console.log(planToBeReturned.calories );
            return res.status(404).json({message: "Looks like there is no plan for you. Sorry"});
            
        }

            let calories = 0;
            planToBeReturned.Meals.forEach(meal =>{
                meal.Food.forEach(food =>{
                    food.dataValues.grams = ~~food.Food_Meal.grams;
                    calories += food.dataValues.grams * food.dataValues.caloriesPer100g /100;
                })  
            })
            planToBeReturned.dataValues.calories = Math.round(calories);

        return res.send(planToBeReturned); 
    
}