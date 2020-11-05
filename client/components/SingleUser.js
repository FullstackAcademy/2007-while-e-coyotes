import React from "react";
import { connect } from "react-redux";
import { ItemCard } from "./ItemCard";
import { Link } from "react-router-dom";

export class SingleUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        orders: [],
      },
    };
  }

  modifyDate(dateString) {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;

    return `${month}, ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  }

  capFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  render() {
    const { user } = this.props;
    const inCart = user.orders.filter((order) => order.status === "cart");
    const ordered = user.orders.filter((order) => order.status === "ordered");
    const orderHistory = user.orders.filter(
      (order) => order.status === "delivered"
    );

    return (
      <div>
        <div className="inner-container">
          <h1>{user.username}</h1>
          <p>{`Joined: ${this.modifyDate(user.createdAt)}`}</p>
          <p>{`Email: ${user.email}`}</p>
          <p>{`Address: ${user.address}`}</p>
          <Link className="asd" to="/users/update">
            <button type="submit">Edit Profile</button>
          </Link>
        </div>

        <div className="inner-container">
          <h3>Items in your cart:</h3>
          <div className="container">
            {inCart.length ? (
              inCart[0].items.map((order) => (
                <ItemCard key={order.id} item={order} />
              ))
            ) : (
              <p>No items in your cart</p>
            )}
          </div>
          <Link className="asd" to="/cart">
            <button type="submit">Go to cart</button>
          </Link>
        </div>

        <h3>Currently pending orders:</h3>
        <div className="inner-container">
          {ordered.length ? (
            ordered.map((order) => {
              return (
                <div className="inner-container" key={order.id}>
                  <p>Ordered on: {this.modifyDate(order.createdAt)}</p>
                  <p
                    className={
                      order.status === "delivered" ? "delivered" : "pending"
                    }
                  >
                    {this.capFirst(order.status)}
                  </p>
                  <div className="container">
                    {order.items.map((order) => (
                      <ItemCard key={order.id} item={order} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No orders pending</p>
          )}
        </div>

        <h3>Order history:</h3>
        <div className="inner-container">
          {orderHistory.length ? (
            orderHistory.map((order) => {
              return (
                <div className="inner-container" key={order.id}>
                  <p>Ordered on: {this.modifyDate(order.createdAt)}</p>
                  <p
                    className={
                      order.status === "delivered" ? "delivered" : "pending"
                    }
                  >
                    {this.capFirst(order.status)}
                  </p>
                  <div className="container">
                    {order.items.map((order) => (
                      <ItemCard key={order.id} item={order} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No orders pending</p>
          )}
        </div>

        <h3>Your Reviews:</h3>
        <div className="inner-container">
          {user.reviews.map((review) => {
            return (
              <div className="inner-container" key={review.id}>
                <p>{this.modifyDate(review.createdAt)}</p>
                <Link className="pagelinks" to={`/items/${review.item.id}`}>
                  {`Your review on ${review.item.name}`}
                </Link>
                <p>{`You said "${review.content}"`}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapState, null)(SingleUser);
