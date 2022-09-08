'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      caloriesPer100g: {
        type: Sequelize.DOUBLE
      },
      proteins: {
        type: Sequelize.DOUBLE
      },
      carbohydrates: {
        type: Sequelize.DOUBLE
      },
      fats: {
        type: Sequelize.DOUBLE
      },
      fibers: {
        type: Sequelize.DOUBLE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Food');
  }
};