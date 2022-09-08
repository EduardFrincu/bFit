'use strict';
const User = require('.').User;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User_log.belongsTo(models.User);
    }
  }
  User_log.init({
    
    weight: DataTypes.INTEGER,
    intake: DataTypes.DOUBLE,
    goal: DataTypes.TINYINT(1),
    userid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User_log',
  });
  return User_log;
};