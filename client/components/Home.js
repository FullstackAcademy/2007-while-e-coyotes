import React from "react";
import Carousel from "react-elastic-carousel";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          id: 1,
          title:
            "https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg",
        },
        {
          id: 2,
          title:
            "https://cemhri.org/wp-content/uploads/2018/04/Home-Four-Banner-Background-Image.png",
        },
      ],
    };
  }

  render() {
    const { items } = this.state;
    return (
      <Carousel>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.title} />
            </div>
          );
        })}
      </Carousel>
    );
  }
}

export default Home;
