'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MealEntry.belongsTo(models.Diary);
      MealEntry.hasMany(models.Log)
      
    }
  }
  MealEntry.init({
    diaryId: DataTypes.INTEGER,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MealEntry',
  });
  return MealEntry;
};