import React from 'react';
import { Link } from 'react-router-dom';

export const ItemCard = ({ item }) => {
  return (
    <div className='itemCard'>
      <div className='itemImg'>
        <img src={item.imageUrl} />
      </div>
      <div className='itemInfo'>
        {/* TODO: Make Link to SingleItem view */}
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
    </div>
  )
}
