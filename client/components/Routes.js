import React from "react";
import { connect } from "react-redux";

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import SingleUser from "./SingleUser";
import Login from "./FormikLogin";
import ItemList from "./ItemList";
import Footer from "./Footer";
import SingleItem from "./SingleItem";
import Cart from "./Cart";
import { logoutUser } from "../store/userReducer";

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
              <Link className="navbar" to="/items">
                ADMIN
              </Link>
            </div>
            <div className="search-container">
              <form action="/">
                <input
                  className="searchbar"
                  type="text"
                  placeholder="Search"
                ></input>
              </form>
            </div>
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
                  <Link className="user-icon" to={`/users/${user.userId}`}>
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
                path={`/users/${user.userId}`}
                exact
                component={SingleUser}
              />
              <Route path="/login" component={Login} />
              <Route path="/cart" component={Cart} />
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
