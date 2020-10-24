import React from 'react';
import axios from 'axios';

import { ItemCard } from './ItemCard';

export default class ItemList extends React.Component{
  constructor() {
    super();
    this.state = {
      items: []
    }
  }
  async componentDidMount(){
    try {
      const itemResponse = await axios.get('/api/items');
      const items = itemResponse.data;
      this.setState({items: items});
    } catch (error) {
      console.log(error);
    }
  }
  render(){
    return (
      <div id='itemList'>
        <h2>Items!</h2>
        <div className='grid-container'>
          {
            this.state.items.map(item => {
              return (
                <ItemCard item={item} key={`item_${item.id}`} />
              )
            })
          }
        </div>
      </div>
    )
  }
}
