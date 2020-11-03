import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { search } from "../../server/routes/users";

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
    };
    this.searchOnChange = this.searchOnChange.bind(this);
  }
  searchOnChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }
  render() {
    const { user, logout } = this.props;
    const { searchValue } = this.state;
    console.log("User:", user);
    return (
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
        <div className="search-container">
          <form action="/">
            <input
              value={searchValue}
              onChange={this.searchOnChange}
              className="searchbar"
              type="text"
              placeholder="Search"
            ></input>
          </form>
        </div>
        <div className="account-nav">
          {user.class === "guest" ? (
            <Link className="navbar" to="/login">
              LOGIN
            </Link>
          ) : (
            <div>
              <Link className="user-icon" to={`/users/${user.id || null}`}>
                <img src={user.userImage} />
                <p>{user.username}</p>
              </Link>
              <Link className="navbar" to="/" onClick={logout}>
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
    );
  }
}
