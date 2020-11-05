import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../store/userReducer";
import { updateOrder } from "../store/ordersReducer";
import { getOrder } from "../store/singleOrderReducer";

class SingleAdminOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "cart",
    };
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getOrder(id);
    this.props.validateUser();
  }
  save(ev) {
    ev.preventDefault();
    const order = this.props.order;
    order.status = this.state.status;
    this.props.updateOrder(order, this.props.history);
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const { order } = this.props;
    const { save } = this;
    return isAdmin && order.user && order.items ? (
      <div className="admin">
        <h3>Order Number: {order.id}</h3>
        <p>Order Owner: {order.user.username}</p>
        <p>Order Status: {order.status}</p>
        <form onSubmit={save}>
          <div>Change Status: </div>
          <select
            value={this.state.status}
            onChange={(ev) => this.setState({ status: ev.target.value })}
          >
            <option value="cart">Cart</option>
            <option value="ordered">Ordered</option>
            <option value="delivered">Delivered</option>
          </select>
          <button>Update Status</button>
        </form>

        <h4>Items Ordered:</h4>
        {order.items
          ? order.items.map((item) => {
              return (
                <div key={`order_item_${item.id}`}>
                  <p>Item: {item.name}</p>
                  <p>Price: {item.orderItem.priceOrdered}</p>
                  <p>Quantity: {item.orderItem.quantity}</p>
                </div>
              );
            })
          : null}
      </div>
    ) : (
      <div>Sorry, you are not an admin.</div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrder: (order) => dispatch(getOrder(order)),
    updateOrder: (order, history) => dispatch(updateOrder(order, history)),
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(SingleAdminOrder);
