import React from "react";
import { connect } from "react-redux";
import { createItem } from "../store/itemsReducer";
import { fetchUser } from "../store/userReducer";

class CreateItem extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      price: 0,
      inventory: 100,
      rarity: 1,
      itemType: "sword",
      // type: ('sword', 'dagger', 'bow', 'magic'),
      itemClass: "adventurer",
      // type: ('adventurer', 'villain'),
      imageUrl: "",
    };
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    this.props.validateUser();
  }
  save(ev) {
    ev.preventDefault();
    this.props.createItem(
      {
        name: this.state.name,
        description: this.state.description,
        price: Number(this.state.price),
        imageUrl: this.state.imageUrl,
        inventory: Number(this.state.inventory),
        rarity: Number(this.state.rarity),
        itemType: this.state.itemType,
        itemClass: this.itemClass,
      },
      this.props.history
    );
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const {
      name,
      description,
      price,
      imageUrl,
      inventory,
      rarity,
      itemType,
      itemClass,
    } = this.state;
    const { save } = this;
    return isAdmin ? (
      <div>
        <form onSubmit={save}>
          <div>Item Name:</div>
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
          <div>Item Inventory: </div>
          <input
            value={inventory}
            onChange={(ev) => this.setState({ inventory: ev.target.value })}
          />
          <div>Item Rarity: </div>
          <input
            value={rarity}
            onChange={(ev) => this.setState({ rarity: ev.target.value })}
          />
          <div>Item Type: </div>
          <select
            value={itemType}
            onChange={(ev) => this.setState({ itemType: ev.target.value })}
          >
            <option value="sword">Sword</option>
            <option value="dagger">Dagger </option>
            <option value="bow">Bow</option>
            <option value="magic">Magic</option>
          </select>
          <div>Item Class: </div>
          <select
            value={itemClass}
            onChange={(ev) => this.setState({ itemClass: ev.target.value })}
          >
            <option value="adventurer">Adventurer</option>
            <option value="villain">Villain</option>
          </select>
          <button disabled={!name}>Create Item</button>
        </form>
      </div>
    ) : (
      <div>Sorry, you are not an admin.</div>
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
    createItem: (item, history) => {
      dispatch(createItem(item, history));
    },
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(CreateItem);
