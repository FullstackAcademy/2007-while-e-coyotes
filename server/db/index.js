const db = require('./database');

//import models
const Item = require('./models/Item');
const User = require('./models/User');

//model relationships


module.exports = {
  db,
  Item,
  User
};
