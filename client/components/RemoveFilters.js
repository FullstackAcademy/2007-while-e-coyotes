import React from "react";

//these are cool, but there's a bug and I don't want to fix it right now
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
              X {fil.label}
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
              X {fil.label}
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
              X {fil.label}
            </button>
          );
        })}
    </div>
  );
};
