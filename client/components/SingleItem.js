import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SingleItem extends React.Component{
  constructor() {
    super();
    this.state = {
      singleItem: {
        reviews: []
      }
    }
  }
  async componentDidMount(){
    try {
      const itemResponse = await axios.get('/api/items/3');
      const item = itemResponse.data;
      this.setState({singleItem: item});
    } catch (error) {
      console.log(error);
    }
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
