# TypeScript Type Assertions, Interfaces, Types, Inference, and Generics

This code repository covers essential TypeScript concepts, including type assertions, interfaces, types, inference, and generics. These concepts enable the creation of type-safe, reusable code by defining structures and enabling flexibility in handling multiple data types.

## 1. Type Assertions

Type assertions allow treating a variable as a specific type, especially useful when working with `any` or union types (`number | string`). This example includes assertions to manipulate strings and numbers, and demonstrates type-safe error handling.

```typescript
let anything: any;
anything = "hello";
let strLength = (anything as string).length; // Assert 'anything' as a string
console.log(strLength); // Outputs the string length

anything = 123;
console.log((anything as number).toFixed(2)); // Assert 'anything' as a number and format it

const convertValue = (value: number | string): string => {
  if (typeof value === "number") {
    return `The converted value is ${value.toFixed(2)}`;
  } else {
    return `The converted value is ${parseFloat(value).toFixed(2)}`;
  }
};

const res1 = convertValue(123);
const res2 = convertValue("123");
console.log(res1, res2); // Outputs formatted values

interface CustomError extends Error {
  message: string;
}

try {
  // Example try-catch with a custom error interface
} catch (error) {
  console.log((error as CustomError).message);
}
```

## 2. Interfaces, Types, and Inference

This section demonstrates TypeScript interfaces, types, and type inference. Interfaces and types allow defining object structures and function signatures for consistent and type-safe usage.

### Code Example

```typescript
interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: "John",
  age: 30,
};
console.log(person);

type rollNumber = number;

type userWithRollNumber = Person & { rollNumber: rollNumber };
let user: userWithRollNumber = {
  name: "John",
  age: 30,
  rollNumber: 123,
};
console.log(user); // { name: 'John', age: 30, rollNumber: 123 }

interface isStudent {
  isStudent: boolean;
}

interface userWithRollNumberInterface
  extends Person,
    isStudent,
    userWithRollNumber {}
let user3: userWithRollNumberInterface = {
  name: "John",
  age: 30,
  rollNumber: 123,
  isStudent: true,
};
console.log(user3); // { name: 'John', age: 30, rollNumber: 123, isStudent: true }

type Roll = number[] | number;

let roll: Roll = [1, 2, 3];
console.log(roll); // [ 1, 2, 3 ]
roll = 1;
console.log(roll); // 1

interface Roll2 {
  [index: number]: number;
}
let roll2: Roll2 = [1, 2, 3];

type Add = (a: number, b: number) => number;
let add: Add = (a, b) => a + b;
console.log(add(1, 2)); // 3

interface Add2 {
  (a: number, b: number): number;
}
const add2: Add2 = (a, b) => a + b;
console.log(add2(1, 4)); // 5
```

## 3. Generics in TypeScript

Generics provide a way to create reusable components that work over a variety of types rather than a single one. This increases code flexibility and type safety by ensuring that data types are enforced based on how they are used.

### Generics Example

```typescript
const rollNumber: number[] = [1, 2, 3, 4, 5];
const mentors: string[] = ["John", "Doe", "Jane", "Doe"];
const boolArray: boolean[] = [true, false, true, false];

console.log(rollNumber);
console.log(mentors);
console.log(boolArray);

// Using Array<T> generic syntax
const rollNumber2: Array<number> = [1, 2, 3, 4, 5];
const mentors2: Array<string> = ["John", "Doe", "Jane", "Doe"];
const boolArray2: Array<boolean> = [true, false, true, false];

console.log(rollNumber2);
console.log(mentors2);
console.log(boolArray2);

// Defining a custom generic type
type GenericType<T> = Array<T>;

const rollNumber3: GenericType<number> = [1, 2, 3, 4, 5];
const mentors3: GenericType<string> = ["John", "Doe", "Jane", "Doe"];
const boolArray3: GenericType<boolean> = [true, false, true, false];

type T = number | string | boolean;
const genericArray: GenericType<T> = [1, true, "imam"];
console.log(genericArray);

// Using a generic type for objects
const newUser: GenericType<{
  name: string;
  age: number;
}> = [
  { name: "John", age: 28 },
  { name: "Jane", age: 25 },
];
console.log(newUser);
```

### Generic Tuple Example

Generic tuples allow specifying multiple types for tuple elements, increasing type flexibility for multiple values.

```typescript
type Human<x, y, z> = [x, y, z];

const human: Human<string, number, boolean> = ["John", 28, true];

console.log(human); // ["John", 28, true]

const humanObject: Human<{ name: string; age: number }, string, boolean> = [
  { name: "John", age: 28 },
  "Jane",
  true,
];
console.log(humanObject); // [{ name: 'John', age: 28 }, 'Jane', true]
```

## Key Interview Questions

1. **What is the difference between interfaces and types in TypeScript?**
2. **How can interfaces be extended to add properties?**
3. **What is the benefit of using type aliases for complex types?**
4. **How does TypeScript handle multiple inheritance with interfaces?**
5. **What are type assertions, and how do they help in working with union types?**
6. **Why is defining a custom error interface useful in TypeScript?**
7. **What are generics, and how do they help in building reusable components?**
8. **How can you create a generic function that accepts multiple data types?**
9. **What is the difference between using `Array<T>` and `T[]` in TypeScript?**
10. **How can you create a generic tuple type?**
