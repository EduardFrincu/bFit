'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Exercise, {through: 'user-exercise'});
      User.belongsToMany(models.MealPlan, { through: models.MealPlans_User });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    intake: DataTypes.DOUBLE,
    role: DataTypes.TINYINT(1),
    goal: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });
  return User;
};

const hashPassword = async (user) =>{
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }
  return user;
}