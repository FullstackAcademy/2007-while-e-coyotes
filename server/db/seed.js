const { green, red } = require('chalk')
const {db, Item, User } = require('../db')
const itemsList = require('./inventory/itemsList')

//this function will be used later to randomly assign rarity
const random = (min, max) => Math.floor(Math.random() * (max - min) + min)

//each item can have multiple rarity values, which will depend on its prefix. The following prefixes and their associated description will be applied to every item.
const itemRarity = {
    Rusty: "The item has turned a crusty brown from years of neglect. Still works.", 
    Magic: "Enchanted by the Guild of Magicians, this weapon brings out the user's inner magic.",
    Rare: "Hidden away in a King's crypt somewhere, this weapon is in perfect condition and is blessed by nobility.",
    Legendary: "Maintained and passed down by the world's greatest fighters, this item dwarfs any of its kind."
}

//the following lists the range of each rarity class
const rarityRange = {
    Rusty: [1, 20], 
    Magic: [40, 60],
    Rare: [60, 80],
    Legendary: [80, 100]
}

//depending on the weapon's rarity class, the item will get a corresponding boost (or nerf) to its price and stats
const rarityMultiplier = {
    Rusty: 0.8, 
    Magic: 1.2,
    Rare: 1.5,
    Legendary: 2
}

const seed = async () => {
    try {
        await db.sync({ force: true })
        for (i = 0; i < itemsList.length; i++) {
            const currentItem = itemsList[i]
            const prefixes = Object.keys(itemRarity)
            const description = Object.values(itemRarity)
            await Item.create(currentItem)
            for (j = 0; j < prefixes.length; j++) {
                const prefix = prefixes[j]
                const text = description[j]
                const rarityMin = rarityRange[prefix][0]
                const rarityMax = rarityRange[prefix][1]
                const priceMultiplier = rarityMultiplier[prefix]
                const newItem = {...currentItem,
                                name: `${prefix} ${currentItem.name}`,
                                description: `${currentItem.description}\n${text}`,
                                rarity: random(rarityMin, rarityMax),
                                price: currentItem.price * priceMultiplier
                            }
                await Item.create(newItem)
            }
        }
        console.log(green('db successfully seeded'))
    } catch (err) {
        console.log(red(err))
    }
}

seed()

module.exports = seed
