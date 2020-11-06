import React from "react";
import { connect } from "react-redux";
import { createReview } from "../store/singleItemReducer";
import { fetchUser } from "../store/userReducer";

class CreateReview extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      rating: 5,
    };
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    this.props.validateUser();
  }
  save(ev) {
    ev.preventDefault();
    this.props.createReview(
      {
        rating: Number(this.state.rating),
        content: this.state.content,
        userId: this.props.user.id,
        itemId: this.props.match.params.id,
      },
      this.props.history
    );
  }
  render() {
    const notGuest = this.props.user && this.props.user.class !== "guest";
    const { rating, content } = this.state;
    const { save } = this;
    return notGuest ? (
      <div>
        <form onSubmit={save}>
          <div>Rating:</div>
          <select
            value={rating}
            onChange={(ev) =>
              this.setState({ rating: Number(ev.target.value) })
            }
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <div>Review: </div>
          <input
            value={content}
            onChange={(ev) => this.setState({ content: ev.target.value })}
          />
          <button disabled={!content}>Create Review</button>
        </form>
      </div>
    ) : (
      <div>Please sign in to leave a review!</div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createReview: (review, history) => {
      dispatch(createReview(review, history));
    },
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(CreateReview);
