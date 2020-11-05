import React from "react";
import { Link } from "react-router-dom";
import { itemRarityFinder } from "../utils";

export const ItemCard = ({ item }) => {
  console.log("rarityNum", item.rarity);
  const rarityStr = itemRarityFinder(item.rarity);
  return (
    <div className="itemCard">
      <Link className="singleItem" to={`/items/${item.id}`}>
        <div className={`itemImg itemImg__${rarityStr.slice(0, 3)}`}>
          <img src={item.imageUrl} />
        </div>
        <div className="itemInfo">
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <p className={`rarity-tag rarity-tag__${rarityStr.slice(0, 3)}`}>
            {rarityStr.toUpperCase()}
          </p>
        </div>
      </Link>
    </div>
  );
};
