import React from "react";

export const RemoveFilters = ({ filterButtons, toggleFilter }) => {
  return (
    <div className="remove-filter-buttons">
      {filterButtons.itemType
        .filter((fil) => fil.on)
        .map((fil) => {
          return (
            <button
              onClick={() => {
                console.log(fil.value);
                toggleFilter(fil.value, "itemType");
              }}
              key={fil.label}
            >
              X Item type: {fil.label}
            </button>
          );
        })}
      {filterButtons.price
        .filter((fil) => fil.on)
        .map((fil) => {
          return (
            <button
              onClick={() => toggleFilter(fil.value, "price")}
              key={fil.label}
            >
              X Price: {fil.label}
            </button>
          );
        })}
      {filterButtons.rarity
        .filter((fil) => fil.on)
        .map((fil) => {
          return (
            <button
              onClick={() => toggleFilter(fil.value, "rarity")}
              key={fil.label}
            >
              X Rarity: {fil.label}
            </button>
          );
        })}
    </div>
  );
};
