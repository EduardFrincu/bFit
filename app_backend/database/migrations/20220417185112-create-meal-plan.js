'use strict';
const User = require('../../models').User;
const MealPlan = require('../../models').MealPlan;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MealPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userid:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id"
        }
      }
    });
    MealPlan.belongsTo(User);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MealPlans');
  }
};