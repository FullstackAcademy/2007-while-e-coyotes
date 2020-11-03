/* This function is for filtering items to display on the itemList page.
itemsArr is the array of items from redux store
filters is an obj with the following structure:
filters: {
  itemType: ['sword'],
  price: [ {min: 0, max: 100, id: '0-100'}, {min: 200, max: 4000, id: '200-4000'} ],
  rarity: [ {min: 0, max: 50} ]
}
The function returns a new array of filtered items
*/
export const itemFilter = (itemsArr, filters) => {
  return itemsArr.filter((item) => {
    if (filters.itemType.length) {
      if (!filters.itemType.map((fil) => fil.value).includes(item.itemType))
        return false;
    }
    if (filters.price.length) {
      let priceFlag = false;
      const priceRanges = filters.price.map((fil) => fil.value);
      for (let range of priceRanges) {
        if (item.price <= range.max && item.price >= range.min)
          priceFlag = true;
      }
      if (!priceFlag) return false;
    }
    if (filters.rarity.length) {
      let rarityFlag = false;
      const rarityRanges = filters.rarity.map((fil) => fil.value);
      for (let range of rarityRanges) {
        if (item.rarity <= range.max && item.rarity >= range.min)
          rarityFlag = true;
      }
      if (!rarityFlag) return false;
    }
    if (filters.reviews.length) {
      let reviewFlag = false;
      if (item.reviews.length === 0) return false;
      const reviewAvg = averageReduce(item.reviews, "rating");
      const reviewRanges = filters.reviews.map((fil) => fil.value);
      for (let range of reviewRanges) {
        if (reviewAvg <= range.max && reviewAvg >= range.min) reviewFlag = true;
      }
      if (!reviewFlag) return false;
    }
    return true;
  });
};

//constructing range objects for rarity/price filters
export class rangeConstructor {
  constructor(min, max, rarity = null) {
    this.min = min;
    this.max = max;
    this.id = rarity || `$${min}-$${max}`;
  }
}

export const averageReduce = (arrOfObjs, key) => {
  const total = arrOfObjs.reduce((acc, obj) => acc + obj[key], 0);
  const average = total / arrOfObjs.length;
  return average;
};
