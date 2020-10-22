const Sequelize = require('sequelize');
const db = require('../database');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'ordered', 'delivered')
  }
})

module.exports = Order;
