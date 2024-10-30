"use strict";
//  Learn TypeScript 1.6
//  Learning Functions in TypeScript
function add(x, y) {
    return x + y;
}
add(1, 2); // 3
// object function that is called method
const user2 = {
    name: "Daniel",
    age: 26,
    balance: 0,
    addBalance(balance) {
        return `${this.name} has a balance of $${this.balance + balance}`;
    },
};
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newArray = arr.map((num) => num * 2);
console.log(newArray);
