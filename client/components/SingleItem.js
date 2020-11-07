import React from "react";
import { connect } from "react-redux";
import { destroyItem } from "../store/itemsReducer";
import { getItem, destroyReview } from "../store/singleItemReducer";
import { Link } from "react-router-dom";
import { averageReduce, itemRarityFinder } from "../utils";
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

  handleClick(event) {
    const orderDetails = {
      quantity: this.state.quantity,
      item: this.props.singleItem,
    };
    const { cart } = this.props;
    this.props.addItem(cart.userId, cart.id, orderDetails);
    this.setState({ ...this.state, added: true });
    event.preventDefault();
  }

  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const { singleItem, user } = this.props;
    const rarityStr = itemRarityFinder(singleItem.rarity);
    const selectArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div id="singleItem">
        <Link to="/items">Back to shopping</Link>
        <div className="item-container">
          <div className="itemImg">
            <img src={singleItem.imageUrl} />
          </div>
          <div className="itemDetail">
            <h1>{singleItem.name}</h1>
            <p className={`rarity-tag rarity-tag__${rarityStr.slice(0, 3)}`}>
              {rarityStr.toUpperCase()}
            </p>
            <p className="fancy">{singleItem.description}</p>
            <p className="price">${singleItem.price}</p>
            {this.props ? (
              <form>
                <label htmlFor="quantity"> Select Quantity: </label>
                <select
                  name="quantity"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                >
                  {selectArr.map((num) => {
                    return (
                      <option value={num} key={`select_${num}`}>
                        {num}
                      </option>
                    );
                  })}
                </select>
                <button onClick={(event) => this.handleClick()}>
                  Add to Cart
                </button>
              </form>
            ) : null}
            {this.state.added ? (
              <span className="worked">
                {" "}
                ✅ Item has been added to your cart!
              </span>
            ) : null}
          </div>
        </div>
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
    addItem: (userId, cartId, details) =>
      dispatch(addItem(userId, cartId, details)),
    destroyReview: (review) => dispatch(destroyReview(review)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
