'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MealPlan.hasMany(models.Meal);
      MealPlan.belongsToMany(models.User, { through: models.MealPlans_User });
    }
  }
  MealPlan.init({
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    calories: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'MealPlan',
  });
  return MealPlan;
};