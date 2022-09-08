'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Diary.belongsTo(models.User);
      Diary.hasMany(models.MealEntry);
    }
  }
  Diary.init({
    userid: DataTypes.INTEGER,
    calories: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'Diary',
  });
  return Diary;
};