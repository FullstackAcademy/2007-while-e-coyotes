import React from 'react';
import { connect } from 'react-redux';
import { getItems } from '../store/itemsReducer';

import { ItemCard } from './ItemCard';

class ItemList extends React.Component{
  componentDidMount(){
    if(this.props.items.length === 0){
      this.props.getItems();
    }
  }
  render(){
    return (
      <div id='itemList'>
        <h2>Items!</h2>
        <div className='grid-container'>
          {
            this.props.items.map(item => {
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

const mapState = (state) => {
  return {
    items: state.items
  }
}

const mapDispatch = (dispatch) => {
  return {
    getItems: () => { dispatch(getItems())},
  }
}

export default connect(mapState, mapDispatch)(ItemList);
