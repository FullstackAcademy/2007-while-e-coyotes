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
  },
  userImage :{
    type: Sequelize.STRING,
    defaultValue: 'https://i.stack.imgur.com/l60Hf.png'
  }
})

module.exports = User;
