import React from "react";

const SearchNav = () => {
  return (
    <div className="search-container">
      <form action="#/items">
        <input className="searchbar" type="text" placeholder="Search"></input>
        <button className="search-but" type="submit">
          <img
            className="searchicon"
            src="https://www.flaticon.com/svg/static/icons/svg/622/622669.svg"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchNav;
