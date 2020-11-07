import React from "react";
import { connect } from "react-redux";
import { destroyItem } from "../store/itemsReducer";
import { getItem, destroyReview } from "../store/singleItemReducer";
import { Link } from "react-router-dom";
import { averageReduce } from "../utils";
import { addItem } from "../store/cartReducer";

import { ReviewCard } from "./ReviewCard";

class SingleItem extends React.Component {
  constructor() {
    super();
    this.state = {
      added: false,
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getItem(id);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleClick() {
    const { singleItem, cart } = this.props;
    this.props.addItem(cart.userId, cart.id, singleItem.id);
    this.setState({ ...this.state, added: true });
  }

  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const { singleItem, user } = this.props;
    return (
      <div id="singleItem">
        <Link to="/items">Back to Shopping</Link>
        <div className="itemImg">
          <img src={singleItem.imageUrl} />
        </div>
        <div className="itemDetail">
          <h1>{singleItem.name}</h1>
          <p>${singleItem.price}</p>
          <p className="fancy">{singleItem.description}</p>
          {this.props ? (
            <form>
              <label htmlFor="quantity"> Select Quantity: </label>
              <input
                name="quantity"
                type="text"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
              <button onClick={() => this.handleClick()}>Add to Cart</button>
            </form>
          ) : null}
          {this.state.added ? (
            <span className="worked">
              {" "}
              ✅ Item has been added to your cart!
            </span>
          ) : null}
          <div className="reviews-container">
            <h2>Reviews:</h2>
            <div className="review-info">
              {singleItem.reviews.length === 0 ? (
                <p>There are no reviews for this item.</p>
              ) : (
                <p>
                  {singleItem.name} has an average rating of{" "}
                  {averageReduce(singleItem.reviews, "rating").toFixed(1)} stars
                  from {singleItem.reviews.length} reviews.
                </p>
              )}
              <Link to={`/items/${singleItem.id}/createReview`}>
                Add a new Review!
              </Link>
            </div>
            {!!singleItem.reviews &&
              singleItem.reviews.map((review) => {
                return (
                  <div key={`review_${review.id}`}>
                    {review.userId ? (
                      <ReviewCard
                        review={review}
                        user={user}
                        key={`item_${singleItem.id}_review${review.id}`}
                      />
                    ) : null}
                    {isAdmin ? (
                      <button onClick={() => this.props.destroyReview(review)}>
                        Delete Review
                      </button>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
        {isAdmin ? (
          <div>
            <button
              onClick={() =>
                this.props.destroyItem(singleItem, this.props.history)
              }
            >
              Delete Item
            </button>
            <Link
              className="admin"
              to={`/admin/items/${singleItem.id}/updateItem`}
            >
              Update Item
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = ({ singleItem, user, cart }) => {
  return {
    singleItem,
    user,
    cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItem: (id) => dispatch(getItem(id)),
    destroyItem: (id, history) => dispatch(destroyItem(id, history)),
    addItem: (userId, cartId, itemId) =>
      dispatch(addItem(userId, cartId, itemId)),
    destroyReview: (review) => dispatch(destroyReview(review)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
