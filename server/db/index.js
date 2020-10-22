const db = require('./database');

//import models
const Item = require('./models/Item');
const User = require('./models/User');
const Order = require('./models/Order');
const OrderItems = require('./models/OrderItems');

//model relationships
User.hasMany(Order);
Order.belongsTo(User);

Item.belongsToMany(Order, { through: OrderItems });
Order.belongsToMany(Item, { through: OrderItems });

module.exports = {
  db,
  Item,
  User,
  Order,
  OrderItems
};
