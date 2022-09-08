'use strict';
const Food = require('../../models').Food;
const Meal = require('../../models').Meal;
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('food-meals', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        mealId: {
          type: Sequelize.INTEGER,
          references:{
            model: 'meals',
            key: 'id'
          }          
        },
        foodId: {
          type: Sequelize.INTEGER,
          references:{
            model: 'food',
            key: 'id'
          } 
        }
    });
    Food.belongsToMany(Meal, {through: 'food-meals'});
    Meal.belongsToMany(Food, {through: 'food-meals'});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('food-meals');
     
  }
};
