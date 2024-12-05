# TypeScript Basics

TypeScript is a superset of JavaScript that adds static typing, interfaces, and other features, enhancing development with better tooling and error-checking capabilities. This guide covers fundamental concepts of TypeScript along with examples.

## Table of Contents

- [1. Basic Types](#1-basic-types)
- [2. Interfaces](#2-interfaces)
- [3. Type Aliases](#3-type-aliases)
- [4. Generics](#4-generics)
- [5. Tuples](#5-tuples)
- [6. Functions](#6-functions)
- [7. Enums](#7-enums)

## 1. Basic Types

TypeScript provides several built-in types such as `string`, `number`, `boolean`, `any`, `void`, and `null`.

### Example

```typescript
let username: string = "John";
let age: number = 30;
let isActive: boolean = true;

console.log(username, age, isActive);
```

## 2. Interfaces

Interfaces are used to define the shape of an object, allowing you to define properties and their types.

### Example

```typescript
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "Alice",
  age: 25,
};

console.log(person);
```

## 3. Type Aliases

Type aliases allow you to create a new name for a type, including unions and intersections.

### Example

```typescript
type RollNumber = number;

type User = {
  name: string;
  rollNumber: RollNumber;
};

const user: User = {
  name: "Bob",
  rollNumber: 123,
};

console.log(user);
```

## 4. Generics

Generics enable you to create reusable components that can work with any data type.

### Example

```typescript
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(123));
```

## 5. Tuples

Tuples are fixed-length arrays where each element can have a different type.

### Example

```typescript
type UserTuple = [string, number];

const userTuple: UserTuple = ["Charlie", 35];
console.log(userTuple);
```

## 6. Functions

TypeScript allows you to define function types and overloads.

### Example

```typescript
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 10));
```

## 7. Enums

Enums are a way to define named constants.

### Example

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up); // Output: 0
```

## 8. Interview Questions

<details>
<summary>What is TypeScript and how does it differ from JavaScript?</summary>
<p>TypeScript is a superset of JavaScript that adds static typing and other features to enhance code quality and maintainability. The key difference is that TypeScript catches type-related errors during compile time, whereas JavaScript does this at runtime.</p>
</details>

<details>
<summary>What are the advantages of using interfaces in TypeScript?</summary>
<p>Interfaces provide a clear contract for classes and objects, enabling better type checking and code organization. They support multiple inheritance and can be merged, making them very flexible in defining complex types.</p>
</details>

<details>
<summary>What is the purpose of generics in TypeScript?</summary>
<p>Generics allow developers to create reusable functions, classes, and interfaces that can operate on a variety of types without sacrificing type safety. This leads to more flexible and maintainable code.</p>
</details>

<details>
<summary>Explain the difference between a type alias and an interface.</summary>
<p>Type aliases and interfaces can both be used to define object shapes, but type aliases can represent primitive types, unions, and tuples, while interfaces can be extended and implemented, supporting multiple inheritance. Interfaces are generally preferred for defining object types.</p>
</details>

<details>
<summary>How do you define a tuple in TypeScript?</summary>
<p>A tuple in TypeScript is defined using square brackets with specified types for each element. For example: <code>type UserTuple = [string, number];</code></p>
</details>

```

```
