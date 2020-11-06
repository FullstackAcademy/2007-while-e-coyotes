const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: Sequelize.STRING,
  },
  class: {
    type: Sequelize.ENUM("guest", "adventurer", "villain", "admin"),
  },
  userImage: {
    type: Sequelize.STRING,
    defaultValue: "https://i.stack.imgur.com/l60Hf.png",
  },
});

module.exports = User;
