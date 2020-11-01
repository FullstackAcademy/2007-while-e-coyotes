import React from 'react';
import { connect } from 'react-redux';
import { getItems } from '../store/itemsReducer';

import { ItemCard } from './ItemCard';
import Pagination from './Pagination';

class ItemList extends React.Component{
  constructor(){
    super();
    this.state = {
      currentPage: 1,
      itemsPerPage: 10
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
    const { currentPage, itemsPerPage } = this.state;
    const { items } = this.props;

    //Get current items
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = items.slice(firstItemIndex, lastItemIndex);

    return (
      <div id='itemList'>
        <div id='filters'>
          <p>filters</p>
        </div>
        <div className='item-list-container'>
          <h3>Total items: { items.length }</h3>
          <p>Now showing items {firstItemIndex + 1} through { lastItemIndex} </p>
          <div className='grid-container'>
            {
              currentItems.map(item => {
                return (
                  <ItemCard item={item} key={`item_${item.id}`} />
                )
              })
            }
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={items.length}
            currentPage={currentPage}
            changePage={this.changePage}
          />
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
