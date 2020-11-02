import React from "react";
import { connect } from "react-redux";
import { ItemCard } from "./ItemCard";

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

  render() {
    const { user } = this.props;
    const inCart = user.orders.filter((order) => order.status === "cart");
    const ordered = user.orders.filter((order) => order.status === "ordered");
    const orderHistory = user.orders.filter(
      (order) => order.status === "delivered"
    );
    return (
      <div>
        <h1>{user.username}</h1>
        <p>{`Joined: ${this.modifyDate(user.createdAt)}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <p>{`Email: ${user.address}`}</p>
        <p>{}</p>
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
        <h3>Currently pending orders:</h3>
        <div className="container">
          {ordered.length ? (
            ordered.map((order) => {
              return (
                <div className="inner-container" key={order.id}>
                  <p>Ordered on: {this.modifyDate(order.createdAt)}</p>
                  <p>Status: {order.status}</p>
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
        <div className="container">
          {orderHistory.length ? (
            orderHistory.map((order) => {
              return (
                <div className="inner-container" key={order.id}>
                  <p>Ordered on: {this.modifyDate(order.createdAt)}</p>
                  <p>Status: {order.status}</p>
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
