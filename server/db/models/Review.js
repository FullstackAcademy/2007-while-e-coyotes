const Sequelize = require('sequelize');
const db = require('../database');

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  content: {
      type: Sequelize.TEXT
  }
})

module.exports = Review;
