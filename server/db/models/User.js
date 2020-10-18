const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  class: {
    type: Sequelize.ENUM('guest', 'adventurer', 'villain', 'admin')
  }
})

module.exports = User;
