const express = require("express");
const { db, User, Order, Item, Sessions } = require("../db");
const userRoute = express.Router();

userRoute.get("/", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    if (admin) {
      res.send(
        await User.findAll({
          attributes: {
            exclude: ["password", "id"],
          },
        })
      );
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

userRoute.get("/:id", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.id * 1;
    if (admin || ownUser) {
      res.send(
        await User.findByPk(req.params.id, {
          include: [
            {
              model: Order,
              include: [{ model: Item }],
            },
          ],
          attributes: {
            exclude: ["password", "id"],
          },
        })
      );
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

userRoute.post("/", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const notUser = !req.user || req.user.class === "guest";
    if (admin || notUser) {
      const user = await User.create(req.body);
      res.status(201).send(user);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

userRoute.delete("/:id", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.id * 1;
    if (admin || ownUser) {
      await User.destroy({ where: { id: req.params.id } });
      res.sendStatus(204);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

userRoute.put("/:id", async (req, res, next) => {
  try {
    const admin = req.user && req.user.class === "admin";
    const ownUser = req.user.id === req.params.id * 1;
    if (admin || ownUser) {
      const user = await User.findByPk(req.params.id);
      await User.update(req.body);
      res.send(user);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRoute;
