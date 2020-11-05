import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../store/userReducer";
import { updateOrder } from "../store/ordersReducer";
import { getOrder } from "../store/singleOrderReducer";

class SingleAdminOrder extends React.Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       order: {}
  //     }
  //   }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getOrder(id);
    this.props.validateUser();
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const { order } = this.props;
    console.log(order);
    return isAdmin && order ? (
      <div className="admin">
        <h3>Order Number: {order.id}</h3>
        <p>Order Owner: </p>
        <p>Order Status: {order.status}</p>
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
    updateOrder: (order) => dispatch(updateOrder(order)),
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(SingleAdminOrder);
