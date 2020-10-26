const express = require('express');
const { db, User, Order, Item, Sessions } = require('../db');
const { isUuid ,uuid } = require('uuidv4')
const userRoute = express.Router();
const { red } = require('chalk')
const { cookieName } = require('../constants')

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
        res.send(await User.findByPk(req.params.id, {
            include: [{
                model: Order,
                include: [{ model: Item }]
            }]
        }));
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

userRoute.post('/login', async(req,res,next) => {
    try {
        if(req.cookies[cookieName]){
            res.send({message:'User already logged in'})
        }else{
            const foundUser = await User.findOne({
                where: {
                    username: req.body.username
                }
            })

            //will need to change this to be hashing check 
            if(foundUser.password===req.body.password){
                const sessionID = await uuid()
                const createdSession = await Sessions.create({cookieName:sessionID})
                await foundUser.addSession(createdSession)
                res.cookie(
                    'sessionID', sessionID
                )
                res.send({message:'user successfully logged in'})
            }else{
                //add an handler for when password doesn't match
                console.log('passwordsDontMatch!')
            }

        }
    }
    catch(err) {
        next()
    }
})

userRoute.post('/validation', async(req,res,next) => {
    try{
        if(req.cookies[cookieName]){
            
        }
    }catch(err){
        next()
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
