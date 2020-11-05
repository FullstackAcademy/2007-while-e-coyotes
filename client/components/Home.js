import React from "react";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  return (
    <Carousel autoPlay>
      <div>
        <img
          alt=""
          src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"
        />
        <p className="legend">Banner 1</p>
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
  );
};

export default Home;
