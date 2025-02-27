import { produce } from "immer";

const personOne = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

const personTwo = produce(personOne, (draft) => {
  draft.name = "Doe";
});

console.log(personOne.name); // John

const personThree = produce(personOne, (draft) => {
  draft.address.city = "San Francisco";
});

console.log(personOne.address.city); // New York
