const { Sequelize, sequelize } = require('../models');
const {Op} = require("sequelize");
const MealPlan = require('../models').MealPlan;
const Meal = require('../models').Meal;
const Food = require('../models').Food;
const Food_Meal = require('../models').Food_Meal;
exports.createMealPlan = async (req,res) => {
    
    const userid = req.user.id;
    const mealPlanName = req.body.name;
    const date = Sequelize.fn('NOW');
    console.log(Sequelize.literal('NOW'))

    const plan = await MealPlan.create({
        userid : userid,
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
            let fm =  await Food_Meal.create({
                MealId: meal.id,
                FoodId: foodId.id,
                grams: foodElement.qty
            })
            console.log(fm);

        }
    }   

    res.send(req.body);
}

exports.deleteMealPlanById = async (req,res) =>{
    let {mealPlanId} = req.params;
    try {
        const deletedMeals = await MealPlan.destroy({
            where: {
                id: mealPlanId
            }
        })

        res.status(200).json({message: `The plan with id ${mealPlanId} was deleted.`});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

exports.getMealPlansByUserId = async (req,res) =>{

        console.log(req.headers)
        let mealPlans = await MealPlan.findAll({
            attributes:['id', 'createdAt', 'name'],
            where:{
                userid: req.user.id
            },
            include: 
                { 
                  model: Meal, 
                  attributes: ['id', 'mealPlanId', 'type'],
                  required: true,
                  include: {model:Food, required: true}
                }     
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
exports.getRandomMealPlan = async(req,res) =>{
    let mealPlan = await MealPlan.findOne({
        attributes:['id', 'createdAt', 'name'],
        where:{
            userid: {[Op.ne]: req.user.id},
        },
        order: [sequelize.fn('RAND')],
        include: 
            { 
              model: Meal, 
              required: true,
              include: {model:Food, required: true}
            }     
        })
        let calories = 0;
        mealPlan.Meals.forEach(meal =>{
            meal.Food.forEach(food =>{
                food.dataValues.grams = ~~food.Food_Meal.grams;
                calories += food.dataValues.grams * food.dataValues.caloriesPer100g /100;
            })  
        })
        mealPlan.dataValues.calories = Math.round(calories);
    

    return res.send(mealPlan)
}