import React from "react";
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
    };
    this.changePage = this.changePage.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }
  componentDidMount() {
    if (this.props.items.length === 0) {
      this.props.getItems();
    }
  }
  changePage(num) {
    this.setState({ currentPage: num });
  }
  toggleFilter(value, filterKey) {
    const newFilters = this.state.filterButtons[filterKey].map((fil) => {
      // console.log('fil.val', fil.val);
      // console.log('value', value);
      // console.log('fil.on', fil.on);
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
    const { currentPage, itemsPerPage, filterButtons } = this.state;
    const { items } = this.props;
    const { toggleFilter } = this;

    const filters = {
      itemType: filterButtons.itemType.filter((fil) => fil.on),
      price: filterButtons.price.filter((fil) => fil.on),
      rarity: filterButtons.rarity.filter((fil) => fil.on),
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
          <h3>Total items: {filteredItems.length}</h3>
          <p>
            Now showing items {firstItemIndex + 1} through{" "}
            {filteredItems.length < itemsPerPage
              ? filteredItems.length
              : lastItemIndex}{" "}
          </p>
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
    getItems: () => {
      dispatch(getItems());
    },
  };
};

export default connect(mapState, mapDispatch)(ItemList);
