'use strict';
const User = require('./').User;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise.belongsToMany(models.User, {through: 'user-exercise'});
    }
  }
  Exercise.init({
    name: DataTypes.STRING,
    caloriesBurnt: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};