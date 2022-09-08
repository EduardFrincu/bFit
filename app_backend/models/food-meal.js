'use strict';
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food_Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Meal.belongsToMany(models.Food, {through: Food_Meal});
      models.Food.belongsToMany(models.Meal, {through: Food_Meal});

    }
  }
  Food_Meal.init({
    mealId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER,
    grams: DataTypes.INTEGER
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: 'Food_Meal',
    
  });
  return Food_Meal;
};