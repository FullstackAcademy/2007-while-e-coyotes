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
              <span>{String.fromCharCode(10005)}</span> Item type: {fil.label}
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
              <span>{String.fromCharCode(10005)}</span> Price: {fil.label}
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
              <span>{String.fromCharCode(10005)}</span> Rarity: {fil.label}
            </button>
          );
        })}
      {filterButtons.reviews
        .filter((fil) => fil.on)
        .map((fil) => {
          return (
            <button
              onClick={() => toggleFilter(fil.value, "reviews")}
              key={fil.label}
            >
              <span>{String.fromCharCode(10005)}</span> Review: {fil.label}
            </button>
          );
        })}
    </div>
  );
};
