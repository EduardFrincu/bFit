const { Sequelize, sequelize } = require('../models');
const {Op} = require("sequelize");
const { check } = require('express-validator');
const user = require('../models/user');
const User = require('../models').User;
const Diary = require('../models').Diary;
const MealEntry = require('../models').MealEntry;
const Log = require('../models').Log;
const Food = require('../models').Food;
const User_log = require('../models').User_log;

exports.createDiary = async (req,res) =>{
    let checkTodayDiary = await Diary.findOne({
        where:{
            createdAt: {
                [Op.gt]: new Date().setUTCHours(0, 0, 0, 0),
                [Op.lt]: new Date().toLocaleString()
            },
            userId: req.user.id
        }
    })
    if(checkTodayDiary)
        return res.status(200).json({id:checkTodayDiary.id ,message: `Diary was inserted for user ${req.user.id} on ${checkTodayDiary.createdAt}`});
            

        let insertedDiary = await Diary.create({
            UserId: req.user.id,
            
        })
        return res.status(201).json({id: insertedDiary.id,message: `Created diary for user ${req.user.id}`});
}
exports.createEntryForToday = async(req,res) =>{
    let type = req.body.type;
    let diaryId = req.body.diaryId;
    let createdMealEntry;
    let checkTodayMealEntry = await MealEntry.findOne({
        where:{
            type : type,
            diaryId: diaryId
        }
    })
    if(!checkTodayMealEntry){
        createdMealEntry = await MealEntry.create({
            diaryId: diaryId,
            type: type 
            
        })        
    }
        let mealEntry = checkTodayMealEntry ? checkTodayMealEntry : createdMealEntry;
        if(mealEntry){
            let calories = 0;
            for(const foodElement of req.body.foods){
                let foodId = await Food.findOne({
                    where:{
                        name: foodElement.food 
                    } 
                })

                let alreadyLoggedFood = await Log.findOne({
                    where:{
                        FoodId: foodId.id,
                        MealEntryId: mealEntry.id
                    }
                })
                if(alreadyLoggedFood){
                    let updateLoggedFood = await Log.update(
                        {grams: parseInt(foodElement.qty) + parseInt(alreadyLoggedFood.grams)},
                        {where:{
                            FoodId: alreadyLoggedFood.FoodId,
                            mealEntryId: alreadyLoggedFood.mealEntryId
                        }}
                    )
                    calories += (parseInt(foodElement.qty))*foodId.caloriesPer100g/100
                }
                else{
                    let fm =  await Log.create({
                        MealEntryId: mealEntry.id,
                        FoodId: foodId.id,
                        grams: foodElement.qty
                    })
                    calories += parseInt(foodElement.qty) *foodId.caloriesPer100g/100;
                }
                console.log(calories)
            }
            let diary = await Diary.findOne({
                where:{
                    id:diaryId
                }
            })
            let updateCaloriesForDiary = await Diary.update(
                {calories: parseInt(diary.calories) + parseInt(calories)},
                {where:{
                    id: diaryId
                }}
            )
        }
        // return res.status(201).json({message: `Meal entry with type ${type} was inserted for user ${req.user.id} on ${mealEntry.createdAt}`});
        return res.send(req.body)
            
}
exports.getDiary = async (req,res) =>{
    let {diaryId} = req.params;
    
    let diary = await Diary.findOne({
        where: {
            id:diaryId
        }, 
        order: [
            [MealEntry, 'id', 'ASC'],
          ],
        include: 
            [
                {
                    model:MealEntry,
                    require:true,
                    
                    include: {
                        model: Food,
                        required: true
                    },
                    
                }
            
            ] 
    }) 
    if(!diary) return res.status(404).json({message: "Diary not found"})
    if(diary && req.user.id != diary.userid){
        return res.status(403).json({message: "This diary is not yours."});
    }

    if(diary.MealEntries) { 
        diary.MealEntries.forEach(mealEntry => {
            mealEntry.Food.forEach(food =>{
                food.dataValues.grams = ~~food.Log.grams;
                //calories += food.dataValues.grams * food.dataValues.caloriesPer100g /100;
            })  
        
            //diary.dataValues.calories = Math.round(calories);
        });
}
    
        
    return res.send(diary)
}
exports.getDiaryHistory = async (req,res) =>{
    let userId = req.user.id;
    let diaries = await Diary.findAll({
        where:{
            UserId:userId
        },
        include:{
            model:MealEntry,
            
            include :{
                model:Food,
                
            }
        },
        order:[
            ['createdAt', 'DESC']
        ]
        
    })
    diaries.forEach(diary => {
        diary.MealEntries.forEach(meal =>{
            meal.Food.forEach(food =>{
                food.dataValues.grams = ~~food.Log.grams;
            })  
        })
    });

    return res.send(diaries)
}
exports.deleteDiaryLog = async (req,res) =>{
    let {foodId, mealEntryId} = req.params;

    const logToDelete = await Log.findOne({
        where:{
            mealEntryId: mealEntryId,
            foodId: foodId
        },
        include:[
            {
                model:Food,
                attributes: ['caloriesPer100g'],
                required:true
            },
            {
                model:MealEntry,
                attributes: ['diaryId'],
                required:true,
                include:{
                    attributes:['calories'],
                    model:Diary
                }
            }
        ]
    })

    if(logToDelete){
    
        let caloriesToDelete = logToDelete.Food.caloriesPer100g * logToDelete.grams/100;
        let totalCalories = logToDelete.MealEntry.Diary.calories;
        let diaryId = logToDelete.MealEntry.diaryId;

        const deletedLog = await Log.destroy({
            where: {
                mealEntryId: mealEntryId,
                foodId: foodId
            }
        })
        if(deletedLog == 1){
            let updateCaloriesForDiary = await Diary.update(
                {calories: totalCalories - caloriesToDelete},
                {where:{
                    id: diaryId
                }}
            )
            return res.status(200).json({message: "Record deleted"});
        }
    }
    else return res.status(404).json({message: "Not Found"});
    
}
exports.calculateMacros = async(req,res) =>{

    let {goal,intake} = req.params; //0 - MAINTAIN, 1 - MUSCLE GAIN, 2 - FAT LOSS - goal
    

    // 1g carbs = 4 kcal
    // 1g proteins = 4 kcal
    // 1g fats = 9 kcal
    let percentages = [];
    if(goal == 2){
        percentages = [0.35, 0.35, 0.3] //carbs, proteins, fats
    }
    else if(goal == 1){
        percentages = [0.4, 0.3, 0.3] //carbs, proteins, fats
    }
    else if(goal == 0){
        percentages = [0.5, 0.25, 0.25] //carbs, proteins, fats
    }

    percentages.forEach((element, index) =>{
        element = element * intake;
        percentages[index] = parseFloat(element).toFixed(2) 
        
    })

    let macrosGrams = {
        carbohydrates: parseFloat(percentages[0]/4).toFixed(2) , 
        proteins: parseFloat(percentages[1]/4).toFixed(2),
        fats: parseFloat(percentages[2]/9).toFixed(2),
    }

    return res.send(macrosGrams)
}
exports.getUserHistoryDataByDate = async (req,res) => {
    const {date} = req.params;
    let logByDate = await User_log.findOne({
        where:{
            createdAt: {
                [Op.lt]: new Date(date).setUTCHours(24,0,0,0)
            },
            userId: req.user.id
        },
        order:[
            ['createdAt', 'DESC']
        ]
    })

    return res.send(logByDate);
}

