'use strict';
const MealPlan = require('../../models').MealPlan;
const Meal = require('../../models').Meal;
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('meals', 'mealPlanId', {
       type:Sequelize.INTEGER,
       references:{
         model:"mealplans",
         key:"id"
       }
     });
     Meal.belongsTo(MealPlan);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('meals', 'mealPlanId');
  }
};
