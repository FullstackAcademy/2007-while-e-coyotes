const express = require('express');
const { db, User, Order, Item, Sessions } = require('../db');
const userRoute = express.Router();

userRoute.get('/', async(req, res, next) => {
    try {
        if (req.user && req.user.class === 'admin') {
            res.send(await User.findAll())
        } else {
            res.sendStatus(403);
        }
    }
    catch(err) {
        console.log(err);
    }
})

userRoute.get('/:id', async(req, res, next) => {
    try {
        if (req.user && req.user.class === 'admin' || req.user && req.user.id === req.params.id) {
            res.send(await User.findByPk(req.params.id, {
                include: [{
                    model: Order,
                    include: [{ model: Item }]
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

userRoute.post('/', async(req,res,next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    }
    catch(err) {
        console.log(err);
    }
})


userRoute.delete('/:id', async(req, res, next) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.sendStatus(204);
    }
    catch(err) {
        console.log(err);
    }
})

userRoute.put('/:id', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        await User.update(req.body);
        res.send(user);
    }
    catch(err) {
        console.log(err);
    }
})

module.exports = userRoute;
