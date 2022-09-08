const { Sequelize, sequelize } = require('../models');
const {Op} = require("sequelize");
const User = require('../models').User;
const User_log = require('../models').User_log;
const START_DAY = new Date().setUTCHours(0, 0, 0, 0);

exports.insertUserLog = async (req,res) =>{
    let user = await User.findOne({
        where: {
            id:req.user.id
        }

    })

    let checkUserInsertedLogToday = await User_log.findOne({
        where:{
            createdAt: {
                [Op.gt]: START_DAY,
                [Op.lt]: new Date().toUTCString()
            },
            userId: user.id
        }
    });

    if(!checkUserInsertedLogToday){
        let insertedLog = User_log.create({
            weight: user.weight,
            intake: user.intake,
            goal: user.goal,
            UserId: user.id
            
        })
        return res.status(200).json({message: `Created log for user ${req.user.id}`})
    }
    return res.send(checkUserInsertedLogToday)
  
}
exports.getWeightLog = async (req,res) =>{

    let userLogs = await User_log.findAll({
        attributes:['intake', 'createdAt', 'weight'],
        where:{
            userId: req.user.id
        }
    })
    return res.send(userLogs);
}

