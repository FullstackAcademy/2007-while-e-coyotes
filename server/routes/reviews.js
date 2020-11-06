const express = require("express");
const db = require("../db");
const Review = db.Review;
const User = db.User;

const reviewRoute = express.Router();

reviewRoute.get("/", async (req, res, next) => {
  try {
    res.send(await Review.findAll());
  } catch (err) {
    console.log(err);
  }
});

reviewRoute.get("/:id", async (req, res, next) => {
  try {
    res.send(await Review.findByPk(req.params.id));
  } catch (err) {
    console.log(err);
  }
});

reviewRoute.post("/", async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    const reviewWithUser = await Review.findByPk(review.id, {
      include: [{ model: User }],
    });
    res.status(201).send(reviewWithUser);
  } catch (err) {
    console.log(err);
  }
});

reviewRoute.delete("/:id", async (req, res, next) => {
  try {
    await Review.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
});

reviewRoute.put("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    await Review.update(req.body, { where: { id: req.params.id } });
    res.send(review);
  } catch (err) {
    console.log(err);
  }
});

module.exports = reviewRoute;
