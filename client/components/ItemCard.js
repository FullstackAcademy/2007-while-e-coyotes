import React from "react";
import { Link } from "react-router-dom";

export const ItemCard = ({ item }) => {
  return (
    <div className="itemCard">
      <Link className="singleItem" to={`/items/${item.id}`}>
        <div className="itemImg">
          <img src={item.imageUrl} />
        </div>
        <div className="itemInfo">
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      </Link>
    </div>
  );
};
