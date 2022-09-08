'use strict';
// const User = require('../../models').User;
// const DrunkWater = require('../../models').DrunkWater;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DrunkWater', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      userid:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id"
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DrunkWaters');
  }
};