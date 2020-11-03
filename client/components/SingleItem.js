import React from "react";
import { connect } from "react-redux";
import { destroyItem } from "../store/itemsReducer";
import { getItem } from "../store/singleItemReducer";
import { fetchUser } from "../store/userReducer";
import { Link } from "react-router-dom";

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
        <div className="itemImg">
          <img src={singleItem.imageUrl} />
        </div>
        <div className="itemDetail">
          <h1>{singleItem.name}</h1>
          <p>${singleItem.price}</p>
          <p>${singleItem.description}</p>
          <div className="itemReviews">
            {!!singleItem.reviews &&
              singleItem.reviews.map((review) => {
                return (
                  <div key={`review_${review.id}`}>
                    {review.userId ? (
                      <div
                        className="review"
                        key={`item_${singleItem.id}_review${review.id}`}
                      >
                        <h3>Rating: {review.rating}</h3>
                        <p>{review.content}</p>
                        {/* TODO: Make Link to User view */}
                        <p>-{review.user.username}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
          <Link to="/items">Back to Shopping</Link>
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
