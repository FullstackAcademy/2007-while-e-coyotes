import React from "react";
import { connect } from "react-redux";
import { updateReview } from "../store/singleItemReducer";
import { fetchUser } from "../store/userReducer";

class UpdateReview extends React.Component {
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
    this.props.updateReview(
      {
        rating: Number(this.state.rating),
        content: this.state.content,
        id: this.props.match.params.reviewId,
        itemId: this.props.match.params.id,
      },
      this.props.history
    );
  }
  render() {
    const { rating, content } = this.state;
    const { save } = this;
    return (
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
          <button disabled={!content}>Update Review</button>
        </form>
      </div>
    );
  }
}

const mapState = ({ review, user }) => {
  return {
    review,
    user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateReview: (review, history) => {
      dispatch(updateReview(review, history));
    },
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(UpdateReview);
