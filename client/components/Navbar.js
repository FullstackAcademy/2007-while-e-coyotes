import React from "react";
import { Redirect, Link } from "react-router-dom";

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
      redirect: false,
    };
    this.searchOnChange = this.searchOnChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  searchOnChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }
  handleSearchSubmit(event) {
    event.preventDefault();
    console.log("search submitted:", this.state.searchValue);
    this.setState({ redirect: true });
  }
  componentDidUpdate() {
    if (this.state.redirect === true)
      this.setState({ redirect: false, searchValue: "" });
  }
  render() {
    const { user, logout } = this.props;
    const { searchValue } = this.state;
    if (this.state.redirect === true)
      console.log("Redirect!", this.state.redirect);
    return (
      <nav>
        {this.state.redirect && (
          <Redirect to={`/items?search=${this.state.searchValue}`} />
        )}
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
          <form onSubmit={this.handleSearchSubmit}>
            <input
              value={searchValue}
              onChange={this.searchOnChange}
              className="searchbar"
              type="text"
              placeholder="Search"
            ></input>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="account-nav">
          {user.class === "guest" ? (
            <div>
              <Link className="navbar" to={`/users/create`}>
                SIGN UP
              </Link>
              <Link className="navbar" to="/login">
                LOGIN
              </Link>
            </div>
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
