const express = require('express');
const { db, Order, Item, User } = require('../db');

const orderRoute = express.Router();

orderRoute.get('/', async(req, res, next) => {
    try {
        res.send(await Order.findAll())
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.get('/:id', async(req, res, next) => {
    try {
        res.send(await Order.findByPk(req.params.id, {
            include: [{
                model: Item
            }, {
                model: User
            }]
        }));
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.post('/', async(req,res,next) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).send(order);
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.delete('/:id', async(req, res, next) => {
    try {
        await Order.destroy({ where: { id: req.params.id } });
        res.sendStatus(204);
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.put('/:id', async(req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id);
        await Order.update(req.body);
        res.send(order);
    }
    catch(err) {
        console.log(err);
    }
})

module.exports = orderRoute;
