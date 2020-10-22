const db = require('./database');

//import models
const Item = require('./models/Item');
const User = require('./models/User');
const Order = require('./models/Order');
const OrderItems = require('./models/OrderItems');

//model relationships
Order.belongsTo(User);
User.hasMany(Order);



module.exports = {
  db,
  Item,
  User,
  Order,
  OrderItems
};
