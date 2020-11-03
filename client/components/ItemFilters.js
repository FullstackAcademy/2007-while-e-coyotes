import React from "react";

export default class ItemFilters extends React.Component {
  render() {
    const { toggleFilter, filterButtons } = this.props;
    return (
      <div id="filters">
        <h3>Filter items:</h3>
        <div className="filter-section">
          <h4>By item type</h4>
          {filterButtons.itemType.map((filter) => {
            return (
              <FilterCheckbox
                key={`checkbox_${filter.label}`}
                filter={filter}
                category="itemType"
                toggleFilter={toggleFilter}
                checked={filter.on}
              />
            );
          })}
        </div>
        <div className="filter-section">
          <h4>By rarity</h4>
          {filterButtons.rarity.map((filter) => {
            return (
              <FilterCheckbox
                key={`checkbox_${filter.label}`}
                filter={filter}
                category="rarity"
                toggleFilter={toggleFilter}
                checked={filter.on}
              />
            );
          })}
        </div>
        <div className="filter-section">
          <h4>By price</h4>
          {filterButtons.price.map((filter) => {
            return (
              <FilterCheckbox
                key={`checkbox_${filter.label}`}
                filter={filter}
                category="price"
                toggleFilter={toggleFilter}
                checked={filter.on}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const FilterCheckbox = ({ filter, toggleFilter, category, checked }) => {
  return (
    <div className="checkbox-container">
      <label className="filter-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggleFilter(filter.value, category)}
        />
        {filter.label}
      </label>
    </div>
  );
};
