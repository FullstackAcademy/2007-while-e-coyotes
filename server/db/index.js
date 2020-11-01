const db = require("./database");

//import models
const Item = require("./models/Item");
const User = require("./models/User");
const Order = require("./models/Order");
const OrderItems = require("./models/OrderItems");
const Review = require("./models/Review");
const Sessions = require("./models/Sessions");

//model relationships
User.hasMany(Order);
Order.belongsTo(User);

Item.belongsToMany(Order, { through: OrderItems });
Order.belongsToMany(Item, { through: OrderItems });

User.hasMany(Review);
Review.belongsTo(User);

Item.hasMany(Review);
Review.belongsTo(Item);

User.hasMany(Sessions);
Sessions.belongsTo(User);

module.exports = {
  db,
  Item,
  User,
  Order,
  OrderItems,
  Review,
  Sessions,
};
