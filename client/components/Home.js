import React from "react";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import { getItems } from "../store/itemsReducer";
import { ItemCard } from "./ItemCard";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllItems();
  }

  generateRandomItems() {
    const { items } = this.props;
    const randomItems = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * Math.floor(items.length));
      const randomItem = items[randomNum];
      randomItems.push(randomItem);
    }
    return randomItems;
  }

  render() {
    const randomItems = this.generateRandomItems();
    return (
      <div>
        <Carousel autoPlay>
          <div>
            <img
              alt=""
              src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"
            />
            <p className="legend">New Item: Stanleys Twig</p>
          </div>
          <div>
            <img
              alt=""
              src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"
            />
            <p className="legend">Banner 2</p>
          </div>
          <div>
            <img
              alt=""
              src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"
            />
            <p className="legend">Hi Eliot, this is Aminoor</p>
          </div>
        </Carousel>
        <h1 className="category">SHOP NEW ITEMS</h1>
        <div className="itemrow">
          {randomItems.map((item) => {
            if (item) {
              return (
                <div className="home-items" key={item.id}>
                  <ItemCard item={item} />
                </div>
              );
            }
          })}
        </div>
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

export default connect(mapState, mapDispatch)(Home);
