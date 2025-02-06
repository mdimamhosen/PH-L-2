// Currying / Function Currying

// Currying is a technique of evaluating function with multiple arguments, into sequence of functions with single argument.

// Normal function

const multiply = (a, b) => a * b;

console.log(multiply(2, 3)); // 6

// Curried function
const curriedMultiply = (a) => (b) => a * b;

function mul(a) {
  return function (b) {
    return a * b;
  };
}

const finalPriceAfterDiscount = (price) => (discount) =>
  price - price * discount;

const applyDiscount = finalPriceAfterDiscount(100);
console.log(applyDiscount(0.1)); // 90

console.log(applyDiscount(0.3)); // 70

const applyDiscount2 = (discount) => (price) => price - price * discount;

const apply10PercentDiscount = applyDiscount2(0.1);

console.log(apply10PercentDiscount(100)); // 90
clg;
