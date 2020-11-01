import React from "react";
import { connect } from "react-redux";
import { updateItem } from "../store/itemsReducer";
import { getItems } from "../store/itemsReducer";
import { fetchUser } from "../store/userReducer";

class UpdateItem extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
    };
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    this.props.getItems();
    this.props.validateUser();
  }
  save(ev) {
    ev.preventDefault();
    this.props.updateItem(
      {
        name: this.state.name,
        description: this.state.description,
        price: Number(this.state.price),
        imageUrl: this.state.imageUrl,
        id: this.props.match.params.id,
      },
      this.props.history
    );
  }
  render() {
    const { name, description, price, imageUrl } = this.state;
    const { save } = this;
    const isAdmin = this.props.user && this.props.user.class === "admin";
    return isAdmin ? (
      <div>
        <form onSubmit={save}>
          <div>Item Name: </div>
          <input
            value={name}
            onChange={(ev) => this.setState({ name: ev.target.value })}
          />
          <div>Item Description: </div>
          <input
            value={description}
            onChange={(ev) => this.setState({ description: ev.target.value })}
          />
          <div>Item Price: $</div>
          <input
            value={price}
            onChange={(ev) => this.setState({ price: ev.target.value })}
          />
          <div>Item imageUrl: </div>
          <input
            value={imageUrl}
            onChange={(ev) => this.setState({ imageUrl: ev.target.value })}
          />
          <button>Update Item</button>
        </form>
      </div>
    ) : (
      <div>Sorry, you are not an admin.</div>
    );
  }
}

const mapState = ({ item, user }) => {
  return {
    item,
    user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItems: () => dispatch(getItems()),
    updateItem: (item, history) => {
      dispatch(updateItem(item, history));
    },
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(UpdateItem);
