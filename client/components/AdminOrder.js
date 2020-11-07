import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../store/userReducer";
import { getOrders } from "../store/ordersReducer";

class AdminOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    this.props.getOrders();
    this.props.validateUser();
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const { orders } = this.props;
    console.log("orders", orders);
    return isAdmin ? (
      <div className="admin admin__orders">
        <h2>Orders:</h2>
        <div className="grid-container">
          {orders
            ? orders.map((order) => {
                return (
                  <div key={`order_${order.id}`}>
                    <Link className="admin" to={`/admin/orders/${order.id}`}>
                      <h3>Order #: {order.id}</h3>
                      <p>Status: {order.status}</p>
                      <p>Owner: {order.user.username}</p>
                      <p>Items Purchased: {order.items.length}</p>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    ) : (
      <div>Sorry, you are not an admin.</div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders()),
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(AdminOrder);
