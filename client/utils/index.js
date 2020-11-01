/* This function is for filtering items to display on the itemList page.
itemsArr is the array of items from redux store
filterArr is an array of objects containing filters, in local state
filter obj structure is { fil: filterCategory, val: filterValue }
for example: { fil: 'itemType', val: 'sword' } */
export const itemFilter = (itemsArr, filterArr) => {
  return itemsArr.filter(item => {
    for (const filter of filterArr){
      //price + rarity filter have different keys
      if (filter.fil === 'price' || filter.fil === 'rarity'){
        if (item[filter['fil']] > filter.max || item[filter['fil']] < filter.min) return false;
      } else {
        if (item[filter['fil']] !== filter.val) return false;
      }
    }
    return true;
  })
}
