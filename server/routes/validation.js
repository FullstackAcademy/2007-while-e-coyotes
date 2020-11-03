const express = require("express");
const { User, Sessions, Order, Item, Review } = require("../db");
const { uuid } = require("uuidv4");

const validationRoute = express.Router();

validationRoute.post("/onPageLoad", async (req, res, next) => {
  try {
    if (req.user) {
      const foundUser = await User.findByPk(req.user.id, {
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Order,
            include: [{ model: Item }],
          },
          {
            model: Review,
            include: [{ model: Item }],
          },
        ],
      });
      res.send(foundUser);
    } else {
      const sessionID = await uuid();
      const newUser = await User.create({
        username: sessionID,
        password: null,
        class: "guest",
      });
      const createdSession = await Sessions.create({ SessionID: sessionID });
      await newUser.addSession(createdSession);
      res.cookie("sessionID", sessionID);
      res.send(newUser);
    }
  } catch (error) {
    next(error);
  }
});

validationRoute.post("/login", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      where: {
        username: req.body.username,
      },
      //once we setup hashing we want to exclude sending back password, for now its ok
      // attributes: {
      //     exclude: ['password']
      // }
    });

    if (!foundUser) {
      res.sendStatus(401);
    } else {
      if (foundUser.password === req.body.password) {
        const sessionID = await uuid();
        const createdSession = await Sessions.create({ SessionID: sessionID });
        await foundUser.addSession(createdSession);
        /*
                    will eventually want to merge the old session into new session
                    or merge the old sessions cart into the new sessions cart
                */
        res.cookie("sessionID", sessionID);

        const sendUser = await User.findByPk(foundUser.id, {
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: Order,
              include: [{ model: Item }],
            },
            {
              model: Review,
              include: [{ model: Item }],
            },
          ],
        });
        res.send(sendUser);
      } else {
        //add an handler for when password doesn't match
        console.log("passwordsDontMatch!");
      }
    }
  } catch (error) {
    next(error);
  }
});

validationRoute.delete("/logout", async (req, res, next) => {
  try {
    const currentSessionID = req.cookies.sessionID;
    await Sessions.destroy({
      where: {
        SessionID: currentSessionID,
      },
    });
    res.clearCookie("sessionID");
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = validationRoute;
