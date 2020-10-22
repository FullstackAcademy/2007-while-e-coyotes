const Sequelize = require('sequelize');
const db = require('../database');

const OrderItems = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  priceOrdered: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false
  }
})

module.exports = OrderItems;
