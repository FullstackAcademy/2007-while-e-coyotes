const express = require('express');
const { db, Order, Item, User } = require('../db');

const orderRoute = express.Router();

orderRoute.get('/', async(req, res, next) => {
    try {
        const admin = req.user && req.user.class === 'admin';
        if (admin) {
            res.send(await Order.findAll());
        } else {
            res.sendStatus(403);
        }
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.get('/:id', async(req, res, next) => {
    try {
        const admin = req.user && req.user.class === 'admin';
        const ownUser = req.user.id === req.params.id * 1;
        if (admin || ownUser) {
            res.send(await Order.findByPk(req.params.id, {
                include: [{
                    model: Item
                }, {
                    model: User
                }]
            }));
        } else {
            res.sendStatus(403);
        }
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.post('/', async(req,res,next) => {
    try {
        const admin = req.user && req.user.class === 'admin';
        const notUser = !req.user || req.user.class === 'guest';
        if(admin || notUser) {
            const order = await Order.create(req.body);
            res.status(201).send(order);
        } else {
            res.sendStatus(403);
        }
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.delete('/:id', async(req, res, next) => {
    try {
        const admin = req.user && req.user.class === 'admin';
        const ownUser = req.user.id === req.params.id * 1;
        if (admin || ownUser) {
            await Order.destroy({ where: { id: req.params.id } });
            res.sendStatus(204);
        } else {
            res.sendStatus(403);
        }
    }
    catch(err) {
        console.log(err);
    }
})

orderRoute.put('/:id', async(req, res, next) => {
    try {
        const admin = req.user && req.user.class === 'admin';
        const ownUser = req.user.id === req.params.id * 1;
        if (admin || ownUser) {
            const order = await Order.findByPk(req.params.id);
            await Order.update(req.body);
            res.send(order);
        } else {
            res.sendStatus(403);
        }
    }
    catch(err) {
        console.log(err);
    }
})

module.exports = orderRoute;
