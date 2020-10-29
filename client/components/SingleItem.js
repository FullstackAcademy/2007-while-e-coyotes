import React from 'react';
import { connect } from 'react-redux';
import { getItem } from '../store/singleItemReducer';

import { Link } from 'react-router-dom';

export class SingleItem extends React.Component{
  constructor() {
    super();
    this.state = {
      singleItem: {
        reviews: []
      }
    }
  }
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getItem({ id });
  }
  render(){
    const { singleItem } = this.state;
    return (
      <div id='singleItem'>
        <div className='itemImg'>
          <img src={singleItem.imageUrl} />
        </div>
        <div className='itemDetail'>
          <h1>{singleItem.name}</h1>
          <p>${singleItem.price}</p>
          <p>${singleItem.description}</p>
          <div className='itemReviews'>
            {
              singleItem.reviews.map(review => {
                return(
                  <div className='review' key={`item_${singleItem.id}_review${review.id}`}>
                    <h3>Rating: {review.rating}</h3>
                    <p>{review.content}</p>
                    {/* TODO: Make Link to User view */}
                    <p>-{review.user.username}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ singleItem }) => {
  return {
    singleItem
  }
}

const mapDispatch = (dispatch) => {
  return {
    getItem: (id) => dispatch(getItem(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleItem);
