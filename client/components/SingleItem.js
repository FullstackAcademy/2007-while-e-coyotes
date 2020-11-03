import React from "react";
import { connect } from "react-redux";
import { destroyItem } from "../store/itemsReducer";
import { getItem } from "../store/singleItemReducer";
import { fetchUser } from "../store/userReducer";
import { Link } from "react-router-dom";
import { averageReduce } from "../utils";

import { ReviewCard } from "./ReviewCard";

class SingleItem extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getItem(id);
    this.props.validateUser();
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const { singleItem } = this.props;
    console.log(singleItem);
    return (
      <div id="singleItem">
        <Link to="/items">Back to Shopping</Link>
        <div className="itemImg">
          <img src={singleItem.imageUrl} />
        </div>
        <div className="itemDetail">
          <h1>{singleItem.name}</h1>
          <p>${singleItem.price}</p>
          <p>${singleItem.description}</p>
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
            </div>
            {!!singleItem.reviews &&
              singleItem.reviews.map((review) => {
                return (
                  <ReviewCard
                    review={review}
                    key={`item_${singleItem.id}_review${review.id}`}
                  />
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

const mapState = ({ singleItem, user }) => {
  return {
    singleItem,
    user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItem: (id) => dispatch(getItem(id)),
    validateUser: () => dispatch(fetchUser()),
    destroyItem: (id, history) => dispatch(destroyItem(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
