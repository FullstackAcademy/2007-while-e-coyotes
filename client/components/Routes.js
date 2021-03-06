import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import SingleUser from "./SingleUser";
import Login from "./FormikLogin";
import ItemList from "./ItemList";
import Footer from "./Footer";
import SingleItem from "./SingleItem";
import UpdateItem from "./UpdateItem";
import CreateItem from "./CreateItem";
import CreateUser from "./CreateUser";
import Admin from "./Admin";
import AdminItem from "./AdminItem";
import AdminOrder from "./AdminOrder";
import AdminUser from "./AdminUser";
import SearchNav from "./SearchNav";
import { logoutUser } from "../store/userReducer";
import Cart from "./Cart";
import UpdateUser from "./UpdateUser";
import LootBox from "./LootBox";
import UpdateReview from "./UpdateReview";
import CreateReview from "./CreateReview";
import SingleAdminOrder from "./SingleAdminOrder";

class Routes extends React.Component {
  constructor() {
    super();
    this.state = {
      searchParams: "",
    };
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ searchParams: event.target.value });
    console.log(this.state);
  }

  render() {
    const { user } = this.props;
    return (
      <Router>
        <div>
          <Navbar user={user} logout={this.logout} />
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/items" exact component={ItemList} />
              <Route path="/items/:id" exact component={SingleItem} />
              <Route path="/lootbox" exact component={LootBox} />
              <Route
                path="/items/:id/createReview"
                exact
                component={CreateReview}
              />
              <Route
                path="/items/:id/reviews/:reviewId/updateReview"
                exact
                component={UpdateReview}
              />
              <Route
                path={`/users/${this.props.user.id || null}`}
                exact
                component={SingleUser}
              />
              <Route path="/users/create" component={CreateUser} />
              <Route path="/users/update" component={UpdateUser} />
              <Route path="/login" component={Login} />
              <Route path="/cart" component={Cart} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/admin/items" exact component={AdminItem} />
              <Route
                path="/admin/items/:id/updateItem"
                exact
                component={UpdateItem}
              />
              <Route path="/admin/createItem" exact component={CreateItem} />
              <Route path="/admin/orders" exact component={AdminOrder} />
              <Route
                path="/admin/orders/:id"
                exact
                component={SingleAdminOrder}
              />
              <Route path="/admin/users" exact component={AdminUser} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
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
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
