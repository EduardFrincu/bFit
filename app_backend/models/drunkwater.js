'use strict';
const User = require('./').User;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DrunkWater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DrunkWater.belongsTo(models.User);
    }
  }
  DrunkWater.init({
    date: DataTypes.DATE,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DrunkWater',
  });
  return DrunkWater;
};