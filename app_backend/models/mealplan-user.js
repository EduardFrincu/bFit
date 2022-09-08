'use strict';
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealPlans_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.Food, {through: MealPlans_User});
      models.MealPlan.belongsToMany(models.Meal, {through: MealPlans_User});

    }
  }
  MealPlans_User.init({
    mealPlanId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    like: DataTypes.TINYINT(1),

  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: 'MealPlans_User',
    
  });
  return MealPlans_User;
};