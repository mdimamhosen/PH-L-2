//  Learn TypeScript 1.6
//  Learning Functions in TypeScript

function add(x: number, y: number): number {
  return x + y;
}

add(1, 2); // 3

// object function that is called method

const user2 = {
  name: "Daniel",
  age: 26,
  balance: 0,
  addBalance(balance: number): string {
    return `${this.name} has a balance of $${this.balance + balance}`;
  },
};

const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newArray: number[] = arr.map((num: number): number => num * 2);
console.log(newArray);
