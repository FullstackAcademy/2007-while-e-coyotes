const { green, red } = require('chalk')
const {db, Item, User } = require('../db')
const itemsList = require('./inventory/itemsList')

//this function will be used later to randomly assign rarity
const random = (limit) => Math.floor(Math.random() * Math.floor(limit))

//each item can have multiple rarity values, whose range will concatinate one of the following prefixes to the item name 
const rarity = ['Rusty', 'Normal', 'Magic', 'Rare', 'Legendary']

//need 'assign' function for rarity

const seed = async () => {
    try {
        await db.sync({ force: true })
        await Item.bulkCreate(itemsList)
        console.log(green('db successfully seeded'))
    } catch (err) {
        console.log(red(err))
    }
}

seed()

module.exports = seed
