const { Sequelize } = require('../models');
const User = require('../models').User;
const User_log = require('../models').User_log;
const insertWeightLog = require('./userLogController').insertWeightLog;
const {Op} = require("sequelize");
const START_DAY = new Date().setUTCHours(0, 0, 0, 0);

exports.updateProfile = async (req,res) =>{
    const updatedUser = await User.update(
        req.body,
        {
            where : {
                id:req.user.id
            }
        }
    )
    let weight= req.body.weight;
    let intake = req.body.intake;
    let goal = req.body.goal;

    let checkUserInsertedLogToday = User_log.findOne({
        where:{
            createdAt: {
                [Op.gt]: START_DAY,
                [Op.lt]: new Date().toUTCString()
            },
            userId: req.user.id
        }
    })
    .then((result) =>{
        if(result == null){
            console.log(result)
            if(weight && intake && goal ){
                let insertedLog = User_log.create({
                    weight: weight,
                    intake: intake,
                    goal: goal,
                    UserId: req.user.id,
                    
                })
            }
            
            
        }
    })
    return res.send(req.body)
}

exports.getUserInfo = async (req,res) => {
    const UserInfo = await User.findOne({
        attributes:['age', 'gender', 'weight', 'height', 'intake', 'goal'],
        where:{
            id: req.user.id
        }        
    })
    return res.send(UserInfo);
}
