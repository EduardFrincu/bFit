'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meal.belongsToMany(models.Food, { through: models.Food_Meal });
      Meal.belongsTo(models.MealPlan);
    }
  }
  Meal.init({
    type: DataTypes.STRING,
    mealPlanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meal',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Meal;
};