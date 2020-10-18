const express = require('express');
const db = require('../db')
const User = db.models.user

const userRoute = express.Router();

userRoute.get('/', async(req, res, next) => {
    try {
        res.send(await User.findAll())
    }
    catch(err) {
        console.log(err);
    }
})

userRoute.get('/:id', async(req, res, next) => {
    try {
        res.send(await User.findByPk(req.params.id, { include: Cart }));
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
