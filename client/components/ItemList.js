import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { getItems } from "../store/itemsReducer";
import { itemFilter } from "../utils/index";
import { initialFilterButtons } from "../constants";

//cards for items
import { ItemCard } from "./ItemCard";

//buttons to remove filters across the top of items
import { RemoveFilters } from "./RemoveFilters";

//handles pagination underneath items
import Pagination from "./Pagination";

//component for filter checkboxes to left of items
import ItemFilters from "./ItemFilters";

class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      itemsPerPage: 15,
      filterButtons: initialFilterButtons,
      searchString: "",
    };
    this.changePage = this.changePage.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.seeAllItems = this.seeAllItems.bind(this);
  }
  componentDidMount() {
    if (this.props.location.search.length > 0) {
      const queryObj = queryString.parse(this.props.location.search);
      const searchString = queryObj.search;
      this.props.getSearchItems(searchString);
      this.setState({ searchString: searchString });
    } else if (this.props.items.length === 0) {
      this.props.getAllItems();
    }
  }
  componentDidUpdate(_prevProps, prevState) {
    if (this.props.location.search.length > 0) {
      const queryObj = queryString.parse(this.props.location.search);
      const searchString = queryObj.search;
      if (searchString !== prevState.searchString) {
        this.props.getSearchItems(searchString);
        this.setState({ searchString: searchString });
      }
    }
  }
  changePage(num) {
    this.setState({ currentPage: num });
  }
  seeAllItems() {
    this.props.getAllItems();
    this.setState({ searchString: "" });
    this.props.history.push("/items");
  }
  toggleFilter(value, filterKey) {
    const newFilters = this.state.filterButtons[filterKey].map((fil) => {
      if (fil.value === value) fil.on = !fil.on;
      return fil;
    });
    this.setState({
      filterButtons: {
        ...this.state.filterButtons,
        [filterKey]: newFilters,
      },
    });
  }
  render() {
    const {
      currentPage,
      itemsPerPage,
      filterButtons,
      searchString,
    } = this.state;
    const { items } = this.props;
    const { toggleFilter, seeAllItems } = this;

    const filters = {
      itemType: filterButtons.itemType.filter((fil) => fil.on),
      price: filterButtons.price.filter((fil) => fil.on),
      rarity: filterButtons.rarity.filter((fil) => fil.on),
      reviews: filterButtons.reviews.filter((fil) => fil.on),
    };

    //Get current items
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const filteredItems = itemFilter(items, filters);
    const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);

    //console.log("Filters:", filters);
    console.log("Filtered items:", filteredItems);
    //console.log("Filter buttons:", filterButtons);

    return (
      <div id="itemList">
        <ItemFilters
          toggleFilter={toggleFilter}
          filterButtons={filterButtons}
        />
        <div className="item-list-container">
          {
            <RemoveFilters
              filterButtons={filterButtons}
              toggleFilter={toggleFilter}
            />
          }
          <div className="item-list-info">
            {searchString.length > 0 ? (
              <div className="search-results">
                <h3>{`Showing results for "${searchString}": ${filteredItems.length} items`}</h3>
                <button onClick={() => seeAllItems()}>See all items</button>
              </div>
            ) : (
              <h3>All items: {filteredItems.length} items</h3>
            )}
            <p>
              Now showing items {firstItemIndex + 1} through{" "}
              {filteredItems.length < itemsPerPage
                ? filteredItems.length
                : lastItemIndex}{" "}
            </p>
          </div>
          <div className="grid-container">
            {currentItems.map((item) => {
              return <ItemCard item={item} key={`item_${item.id}`} />;
            })}
          </div>
          {filteredItems.length < itemsPerPage || (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredItems.length}
              currentPage={currentPage}
              changePage={this.changePage}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllItems: () => {
      dispatch(getItems());
    },
    getSearchItems: (searchString) => {
      dispatch(getItems(searchString));
    },
  };
};

export default connect(mapState, mapDispatch)(ItemList);
