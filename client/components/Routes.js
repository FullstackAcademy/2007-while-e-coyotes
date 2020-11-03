import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import SingleUser from "./SingleUser";
import Login from "./FormikLogin";
import ItemList from "./ItemList";
import Footer from "./Footer";
import SingleItem from "./SingleItem";
import UpdateItem from "./UpdateItem";
import CreateItem from "./CreateItem";
import Admin from "./Admin";
import AdminItem from "./AdminItem";
import AdminOrder from "./AdminOrder";
import AdminUser from "./AdminUser";
import SearchNav from "./SearchNav";
import { logoutUser } from "../store/userReducer";
import Cart from "./Cart";

class Routes extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props;
    return (
      <Router>
        <div>
          <nav>
            <div className="shop-nav">
              <img
                className="icon"
                src="https://findicons.com/files/icons/2799/flat_icons/128/teachers_day_shield.png"
              />
              <Link className="navbar" to="/">
                HOME
              </Link>
              <Link className="navbar" to="/items">
                SHOP
              </Link>
              <Link className="navbar" to="/admin">
                ADMIN
              </Link>
            </div>
            <SearchNav />
            <div className="account-nav">
              {user.class !== "guest" || (
                <Link className="navbar" to={`/users/${user.userId}`}>
                  MY ACCOUNT
                </Link>
              )}
              {user.class === "guest" ? (
                <Link className="navbar" to="/login">
                  LOGIN
                </Link>
              ) : (
                <div>
                  <Link
                    className="user-icon"
                    to={`/users/${this.props.user.id || null}`}
                  >
                    <img src={this.props.user.userImage} />
                    <p>{this.props.user.username}</p>
                  </Link>
                  <Link className="navbar" to="/" onClick={this.logout}>
                    LOGOUT
                  </Link>
                </div>
              )}
              <Link className="navbar" to="/cart">
                <img
                  className="cart"
                  src="https://findicons.com/files/icons/1579/devine/48/cart.png"
                />
              </Link>
            </div>
          </nav>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/items" exact component={ItemList} />
              <Route path="/items/:id" exact component={SingleItem} />
              <Route
                path={`/users/${this.props.user.id || null}`}
                exact
                component={SingleUser}
              />
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
