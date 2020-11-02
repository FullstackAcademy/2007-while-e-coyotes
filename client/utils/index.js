/* This function is for filtering items to display on the itemList page.
itemsArr is the array of items from redux store
filterArr is an array of objects containing filters, in local state
filter is an obj with the following structure:
filters: {
  itemType: ['sword'],
  price: [ {min: 0, max: 100, id: '0-100'}, {min: 200, max: 4000, id: '200-4000'} ],
  rarity: [ {min: 0, max: 50} ]
}
*/
export const itemFilter = (itemsArr, filters) => {
  return itemsArr.filter((item) => {
    if (filters.itemType.length) {
      if (!filters.itemType.includes(item.itemType)) return false;
    }
    if (filters.price.length) {
      let priceFlag = false;
      for (let range of filters.price) {
        if (item.price <= range.max && item.price >= range.min)
          priceFlag = true;
      }
      if (!priceFlag) return false;
    }
    if (filters.rarity.length) {
      let rarityFlag = false;
      for (let range of filters.rarity) {
        if ((item.rarity <= range.max) & (item.rarity >= range.min))
          rarityFlag = true;
      }
      if (!rarityFlag) return false;
    }
    return true;
  });
};

//constructing range objects for rarity/price filters
export class rangeConstructor {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.id = `${min}-${max}`;
  }
}
