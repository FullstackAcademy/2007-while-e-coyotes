const express = require("express");
const { db, Order, Item, User, OrderItems } = require("../db");
const { blue } = require("chalk");
const { uuid } = require("uuidv4");
const stripe = require("stripe")(
  "sk_test_51HjDcQCAamTGRiuGsfeRfwRvjhvTuNSjIMiCOAdUWcMyybiv9uV4QDa1dltQg52KDks9XnIqwfIFaG1LrXZiLQ0E001J6bICXM"
);
const orderRoute = express.Router();

orderRoute.get("/", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    if (admin) {
      res.send(
        await Order.findAll({
          include: [
            { model: Item },
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        })
      );
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

orderRoute.get("/:id", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.id * 1;
    if (admin || ownUser) {
      res.send(
        await Order.findByPk(req.params.id, {
          include: [
            { model: Item },
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        })
      );
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

orderRoute.get("/cart/:userId", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.userId * 1;
    if (admin || ownUser) {
      res.send(
        await Order.findOne({
          where: {
            userId: req.params.userId,
            status: "cart",
          },
          include: [
            {
              model: Item,
            },
          ],
        })
      );
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
});

orderRoute.post("/cart/:userId/:cartId/", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.userId * 1;
    const { item, quantity } = req.body;
    console.log(blue("ORDERS REEEE"));
    console.log(req.params.cartId);
    if (admin || ownUser) {
      const userCart = await Order.findByPk(req.params.cartId, {
        include: [{ model: Item }],
      });
      const gotOrderItem = await OrderItems.findOne({
        where: { orderId: req.params.cartId, itemId: item.id },
      });
      if (!gotOrderItem) {
        const newOrderItem = await OrderItems.create({
          orderId: req.params.cartId,
          itemId: item.id,
          quantity: quantity * 1,
        });
      } else {
        gotOrderItem.quantity += quantity * 1;
        await gotOrderItem.save();
      }

      console.log(userCart.prototype);
      await userCart.reload();
      res.send(userCart);
    }
  } catch (err) {
    next(err);
  }
});

orderRoute.delete("/cart/:userId/:cartId/:itemId", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.userId * 1;
    if (admin || ownUser) {
      const userCart = await Order.findByPk(req.params.cartId, {
        include: [{ model: Item }],
      });
      const itemToDelete = await Item.findByPk(req.params.itemId);
      await userCart.removeItem(itemToDelete);
      await userCart.reload();
      res.send(userCart);
    }
  } catch (err) {
    next(err);
  }
});

orderRoute.post("/", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const notUser = !req.user || req.user.class === "guest";
    if (admin || notUser) {
      const order = await Order.create(req.body);
      res.status(201).send(order);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

orderRoute.delete("/:id", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.id * 1;
    if (admin || ownUser) {
      await Order.destroy({ where: { id: req.params.id } });
      res.sendStatus(204);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

orderRoute.put("/:id", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.id * 1;
    if (admin || ownUser) {
      const order = await Order.findByPk(req.params.id, {
        include: [{ model: Item }, { model: User }],
      });
      await Order.update(req.body, { where: { id: req.params.id } });
      res.send(order);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

orderRoute.post("/makeOrder", async (req, res, next) => {
  try {
    const { token, cart, user } = req.body;
    const price = req.body.cart.items.reduce((acc, item) => {
      acc += item.orderItem.priceOrdered * 1 * item.orderItem.quantity;
      return acc;
    }, 0);

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const uniqueID = uuid();

    await stripe.charges.create(
      {
        amount: price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Confirmation",
      },
      {
        idempotencyKey: uniqueID,
      }
    );

    const gotOrder = await Order.findByPk(cart.id);
    gotOrder.status = "ordered";
    await gotOrder.save();

    const gotUser = await User.findByPk(user.id);
    const newCart = await Order.create({ status: "cart" });
    await gotUser.addOrder(newCart);

    cart.items.map(async (item) => {
      const foundItem = await Item.findByPk(item.id);
      foundItem.inventory -= item.orderItem.quantity;
      await foundItem.save();
    });

    const cartToSend = await Order.findByPk(newCart.id, {
      include: [
        {
          model: Item,
        },
      ],
    });
    res.send(cartToSend);
  } catch (err) {
    next(err);
  }
});

orderRoute.post("/mergeCart", async (req, res, next) => {
  try {
    const tempUserCart = await Order.findByPk(req.body.history.id, {
      include: [
        {
          model: Item,
        },
      ],
    });
    const foundUser = await User.findByPk(req.body.user.id);
    const userCurrentCart = await Order.findOne({
      where: {
        userId: req.body.user.id,
        status: "cart",
      },
      include: [
        {
          model: Item,
        },
      ],
    });

    if (tempUserCart.items.length > 0) {
      foundUser.removeOrder(userCurrentCart);
      tempUserCart.setUser(foundUser);

      tempUserCart.reload();
      res.send(tempUserCart);
    } else {
      res.send(userCurrentCart);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = orderRoute;
