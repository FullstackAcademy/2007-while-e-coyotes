const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  class: {
    type: Sequelize.ENUM('guest', 'adventurer', 'villain', 'admin')
  },
<<<<<<< HEAD
  userImage: {
=======
  userImage :{
>>>>>>> 3237b6184d949c0c48a1b26b0dbc0ee91c61b28b
    type: Sequelize.STRING,
    defaultValue: 'https://i.stack.imgur.com/l60Hf.png'
  }
})

module.exports = User;
