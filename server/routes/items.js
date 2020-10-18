const express = require('express');
const db = require('../db')
const Item = db.models.item

const itemRoute = express.Router();

itemRoute.get('/', async(req, res, next) => {
    try {
        res.send(await Item.findAll())
    }
    catch(err) {
        console.log(err);
    }
})

itemRoute.get('/:id', async(req, res, next) => {
    try {
        res.send(await Item.findByPk(req.params.id));
    }
    catch(err) {
        console.log(err);
    }
})

itemRoute.post('/', async(req,res,next) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).send(item);
    }
    catch(err) {
        console.log(err);
    }
})

itemRoute.delete('/:id', async(req, res, next) => {
    try {
        await Item.destroy({ where: { id: req.params.id } });
        res.sendStatus(204);
    }
    catch(err) {
        console.log(err);
    }
})

itemRoute.put('/:id', async(req, res, next) => {
    try {
        const item = await Item.findByPk(req.params.id);
        await Item.update(req.body);
        res.send(item);
    }
    catch(err) {
        console.log(err);
    }
})

module.exports = itemRoute;
