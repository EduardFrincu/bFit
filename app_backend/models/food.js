'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsToMany(models.Meal, { through: models.Food_Meal });
      Food.hasMany(models.Log);
    }
  }
  Food.init({
    name: DataTypes.STRING,
    caloriesPer100g: DataTypes.DOUBLE,
    proteins: DataTypes.DOUBLE,
    carbohydrates: DataTypes.DOUBLE,
    fats: DataTypes.DOUBLE,
    fibers: DataTypes.DOUBLE
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: 'Food',
  });
  return Food;
};