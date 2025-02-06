const employee_one = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

const employee_two = employee_one;
employee_two.name = "Doe";

console.log(employee_one.name); // Doe

const employee_three = { ...employee_one };
employee_three.name = "Jane";
console.log(employee_one.name); // Doe

employee_three.address.city = "San Francisco";
console.log(employee_one.address.city); // San Francisco

const employee_four = {
  ...employee_one,
  address: {
    ...employee_one.address,
    city: "Los Angeles",
  },
};

console.log(employee_one.address.city); // San Francisco

console.log(employee_four.address.city); // Los Angeles

// Deep copy: It is a process of copying the object along with all the nested objects within it. Example:
const employee_five = JSON.parse(JSON.stringify(employee_one));
employee_five.name = "Alice";
employee_five.address.city = "Chicago";

console.log(employee_one.name); // Doe
console.log(employee_one.address.city); // San Francisco
console.log(employee_five.name); // Alice
console.log(employee_five.address.city); // Chicago

// Shallow copy: It is a process of copying the object along with the first level of nested objects within it. Example:
const employee_six = { ...employee_one };
employee_six.name = "Bob";
employee_six.address.city = "Miami";

console.log(employee_one.name); // Doe
console.log(employee_one.address.city); // Miami
console.log(employee_six.name); // Bob
console.log(employee_six.address.city); // Miami
