const express = require("express");
const { db, Order, Item, User } = require("../db");
const { red } = require("chalk");
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

orderRoute.post("/cart/:userId/:cartId/:itemId", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.userId * 1;
    if (admin || ownUser) {
      const userCart = await Order.findByPk(req.params.cartId, {
        include: [{ model: Item }],
      });
      const itemToBuy = await Item.findByPk(req.params.itemId);
      await userCart.addItem(itemToBuy);
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

      console.log("userCart", userCart);
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

module.exports = orderRoute;
