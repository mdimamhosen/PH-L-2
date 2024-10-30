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
