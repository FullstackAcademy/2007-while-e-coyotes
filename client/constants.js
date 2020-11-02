import { rangeConstructor } from "./utils";

export const initialFilterButtons = {
  itemType: [
    {
      on: false,
      label: "Sword",
      value: "sword",
    },
    {
      on: false,
      label: "Dagger",
      value: "dagger",
    },
    {
      on: false,
      label: "Bow",
      value: "bow",
    },
    {
      on: false,
      label: "Staves & Wands",
      value: "magic",
    },
  ],
  price: [
    {
      on: false,
      label: "$1 - $100",
      value: new rangeConstructor(0, 100),
    },
    {
      on: false,
      label: "$101 - $150",
      value: new rangeConstructor(101, 150),
    },
    {
      on: false,
      label: "$151 - $200",
      value: new rangeConstructor(151, 200),
    },
    {
      on: false,
      label: "$201 - $300",
      value: new rangeConstructor(201, 300),
    },
    {
      on: false,
      label: "$300 or more",
      value: new rangeConstructor(301, 10000),
    },
  ],
  rarity: [
    {
      on: false,
      label: "Rusty",
      value: new rangeConstructor(0, 20, "Rusty"),
    },
    {
      on: false,
      label: "Standard",
      value: new rangeConstructor(21, 40, "Standard"),
    },
    {
      on: false,
      label: "Magic",
      value: new rangeConstructor(41, 60, "Magic"),
    },
    {
      on: false,
      label: "Rare",
      value: new rangeConstructor(61, 80, "Rare"),
    },
    {
      on: false,
      label: "Legendary",
      value: new rangeConstructor(81, 100, "Legendary"),
    },
  ],
};
