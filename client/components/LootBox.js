import React from "react";
import { connect } from "react-redux";
import { getItems } from "../store/itemsReducer";
import { ItemCard } from "./ItemCard";

class LootBox extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  componentDidMount() {
    this.props.getAllItems();
  }

  render() {
    const { items } = this.props;
    const randomNum = Math.floor(Math.random() * Math.floor(items.length));
    let randomItem;
    if (items.length > 0) {
      randomItem = items[randomNum];
    }

    return (
      <div className="loot-container">
        {randomItem && !this.state.clicked ? (
          <button
            type="submit"
            onClick={() => this.setState({ clicked: true })}
          >
            Click to Open!
          </button>
        ) : null}
        {this.state.clicked ? (
          <div className="lootbox">
            <ItemCard item={randomItem} />
            <i className="fancy">{`\n${randomItem.description}`}</i>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllItems: () => {
      dispatch(getItems());
    },
  };
};

export default connect(mapState, mapDispatch)(LootBox);
