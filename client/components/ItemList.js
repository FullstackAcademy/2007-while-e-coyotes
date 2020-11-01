import React from 'react';
import { connect } from 'react-redux';
import { getItems } from '../store/itemsReducer';
import { itemFilter } from '../utils/index';

import { ItemCard } from './ItemCard';
import Pagination from './Pagination';

class ItemList extends React.Component{
  constructor(){
    super();
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      filters: [
        // {fil: 'itemType', val: 'magic'},
        // {fil: 'price', min: 140, max: 200}
      ]
    }
    this.changePage = this.changePage.bind(this);
  }
  componentDidMount(){
    if(this.props.items.length === 0){
      this.props.getItems();
    }
  }
  changePage(num){
    this.setState({currentPage: num});
  }
  render(){
    const { currentPage, itemsPerPage, filters } = this.state;
    const { items } = this.props;

    //Get current items
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const filteredItems = itemFilter(items, filters);
    const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);

    console.log("Filters:", filters);
    console.log("Filtered items:", filteredItems);

    return (
      <div id='itemList'>
        <div id='filters'>
          <p>filters</p>
        </div>
        <div className='item-list-container'>
          <h3>Total items: { filteredItems.length }</h3>
          <p>Now showing items {firstItemIndex + 1} through {filteredItems.length < itemsPerPage ? filteredItems.length : lastItemIndex} </p>
          <div className='grid-container'>
            {
              currentItems.map(item => {
                return (
                  <ItemCard item={item} key={`item_${item.id}`} />
                )
              })
            }
          </div>
          {
            filteredItems.length < itemsPerPage ||
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredItems.length}
              currentPage={currentPage}
              changePage={this.changePage}
            />

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
