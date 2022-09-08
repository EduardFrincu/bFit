'use strict';
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.MealEntry.belongsToMany(models.Food, {through: Log});
      models.Food.belongsToMany(models.MealEntry, {through: Log});
      Log.belongsTo(models.Food);
      Log.belongsTo(models.MealEntry);

    }
  }
  Log.init({
    mealEntryId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER,
    grams: DataTypes.INTEGER
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: 'Log',
    
  });
  return Log;
};