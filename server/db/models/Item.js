const Sequelize = require('sequelize');
const db = require('../database');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
  },
  rarity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 100
    }
  },
  itemType: {
    type: Sequelize.STRING
  },
  itemClass: {
    type: Sequelize.ENUM('adventurer', 'villian')
  }
})

module.exports = Item;
