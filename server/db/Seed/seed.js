const { green, red } = require("chalk");
const { db, Item, User, Review, Order, OrderItems } = require("..");
const itemsList = require("./itemsList");
const userList = require("./userSeed");
const reviewList = require("./reviewSeed");
const { orders } = require("./orderSeed");

//this function will be used later to randomly assign rarity
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

//this function returns an array of unique random numbers in a range
const uniqueRandom = (min, max, arrLength) => {
  if (arrLength <= max - min) {
    const arr = [];
    while (arr.length < arrLength) {
      const newRandom = random(min, max);
      if (!arr.includes(newRandom)) arr.push(newRandom);
    }
    return arr;
  } else return [-1];
};

//each item can have multiple rarity values, which will depend on its prefix. The following prefixes and their associated description will be applied to every item.
const itemRarity = {
  Rusty:
    "The item has turned a crusty brown from years of neglect. Still works.",
  Magic:
    "Enchanted by the Guild of Magicians, this weapon brings out the user's inner magic.",
  Rare:
    "Hidden away in a King's crypt somewhere, this weapon is in perfect condition and is blessed by nobility.",
  Legendary:
    "Maintained and passed down by the world's greatest fighters, this item dwarfs any of its kind.",
};

//the following lists the range of each rarity class
const rarityRange = {
  Rusty: [1, 20],
  Magic: [40, 60],
  Rare: [60, 80],
  Legendary: [80, 100],
};

//depending on the weapon's rarity class, the item will get a corresponding boost (or nerf) to its price and stats
const rarityMultiplier = {
  Rusty: 0.8,
  Magic: 1.2,
  Rare: 1.5,
  Legendary: 2,
};

const seed = async () => {
  try {
    //drop database
    await db.sync({ force: true });
    console.log(green("dropped old database, now seeding new db..."));

    //create items and item variants
    for (i = 0; i < itemsList.length; i++) {
      const currentItem = itemsList[i];
      const prefixes = Object.keys(itemRarity);
      const description = Object.values(itemRarity);
      await Item.create(currentItem);
      for (j = 0; j < prefixes.length; j++) {
        const prefix = prefixes[j];
        const text = description[j];
        const rarityMin = rarityRange[prefix][0];
        const rarityMax = rarityRange[prefix][1];
        const priceMultiplier = rarityMultiplier[prefix];
        const newItem = {
          ...currentItem,
          name: `${prefix} ${currentItem.name}`,
          description: `${currentItem.description}\n${text}`,
          rarity: random(rarityMin, rarityMax),
          price: currentItem.price * priceMultiplier,
        };
        await Item.create(newItem);
      }
    }

    //create users
    await User.bulkCreate(userList);

    //create orders
    await Order.bulkCreate(orders);

    //create reviews with random associations to users and items
    for (let i = 0; i < reviewList.length; i++) {
      await Review.create({
        ...reviewList[i],
        userId: random(1, userList.length - 1),
        itemId: random(1, itemsList.length - 1),
      });
    }

    //add random items to each cart/order
    for (let orderId = 1; orderId <= orders.length; orderId++) {
      //add a random number of items between 1 and 3
      const numberOfItems = random(1, 4);

      //get unique item ids for each item, don't want to double up
      const itemIds = uniqueRandom(1, itemsList.length - 1, numberOfItems);

      //create a row in OrderItems for each item added to a cart
      for (let j = 0; j < numberOfItems; j++) {
        await OrderItems.create({
          quantity: random(1, 10),
          priceOrdered: 100.0,
          orderId: orderId,
          itemId: itemIds[j],
        });
      }
    }

    console.log(green("db successfully seeded"));
  } catch (err) {
    console.log(red(err));
  }
};

seed();

module.exports = seed;
