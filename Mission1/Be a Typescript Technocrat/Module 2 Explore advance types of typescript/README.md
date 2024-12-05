# TypeScript Module 2 Notes

### Table of Contents

1. [Type Assertion / Type Narrowing](#type-assertion--type-narrowing)
2. [Interface, Type vs Interface](#interface-type-vs-interface)
3. [Introduction to Generics](#introduction-to-generics)
4. [Generics with Interface](#generics-with-interface)
5. [Function with Generics](#function-with-generics)
6. [Constraints in TypeScript](#constraints-in-typescript)
7. [Constraints using `keyof`](#constraints-using-keyof)
8. [Asynchronous TypeScript](#asynchronous-typescript)
9. [Conditional Types](#conditional-types)
10. [Mapped Types](#mapped-types)

---

## 2-1: Type Assertion / Type Narrowing

**Definition**: Type assertion is a way to tell TypeScript to treat a value as a certain type. Type narrowing involves refining the type of a variable to a more specific type.

**Example**:

```typescript
let value: any = "Hello, TypeScript!";
// Type Assertion
let strLength: number = (value as string).length;

// Type Narrowing
function narrowType(val: string | number) {
  if (typeof val === "string") {
    console.log("String length:", val.length);
  } else {
    console.log("Square:", val * val);
  }
}
```

**Interview Question**:

- **Q**: What is type assertion in TypeScript?
  **A**: Type assertion allows you to specify a type for a variable to avoid TypeScript errors. It’s like telling TypeScript, "Trust me, I know what I'm doing."

---

## 2-2: Interface, Type vs Interface

**Definition**: Interfaces are used to define the shape of an object, while types can define more complex structures, including unions and intersections. Types and interfaces are similar, but interfaces are more suited for object shapes.

**Example**:

```typescript
// Using interface
interface User {
  name: string;
  age: number;
}

// Using type
type Product = {
  id: number;
  name: string;
};

const user: User = { name: "Alice", age: 25 };
const product: Product = { id: 1, name: "Laptop" };
```

**Interview Question**:

- **Q**: What is the difference between a type and an interface?
  **A**: Interfaces are best for defining object structures, while types are more flexible and can define complex structures, including unions.

---

## 2-3: Introduction to Generics

**Definition**: Generics are a way to create reusable components that work with any data type, making the code flexible and type-safe.

**Example**:

```typescript
function getItem<T>(item: T): T {
  return item;
}

const num = getItem<number>(42); // T is number
const str = getItem<string>("Hello"); // T is string
```

**Interview Question**:

- **Q**: Why do we use generics in TypeScript?
  **A**: Generics provide a way to make components flexible and reusable by allowing functions or classes to handle various types.

---

## 2-4: Generic with Interface

**Definition**: Generics with interfaces allow us to define interfaces that can work with multiple types.

**Example**:

```typescript
interface Box<T> {
  contents: T;
}

const stringBox: Box<string> = { contents: "Books" };
const numberBox: Box<number> = { contents: 42 };
```

**Interview Question**:

- **Q**: Can we use generics with interfaces?
  **A**: Yes, generics with interfaces allow interfaces to work with different types dynamically.

---

## 2-5: Function with Generics

**Definition**: Generics in functions let you define a function that can work with different types without losing type safety.

**Example**:

```typescript
function wrapInArray<T>(item: T): T[] {
  return [item];
}

const numberArray = wrapInArray<number>(5); // [5]
const stringArray = wrapInArray<string>("Hello"); // ["Hello"]
```

**Interview Question**:

- **Q**: How do you declare a generic function in TypeScript?
  **A**: By adding `<T>` before the function parameter list, where `T` is the generic type placeholder.

---

## 2-6: Constraints in TypeScript

**Definition**: Constraints restrict a generic type to a specific set of properties or methods. This ensures the type has what is needed to perform certain actions.

**Example**:

```typescript
function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("Hello"); // Logs: 5
logLength([1, 2, 3]); // Logs: 3
```

**Interview Question**:

- **Q**: What is a constraint in generics?
  **A**: Constraints limit a generic to a type that has certain properties, ensuring safety and utility.

---

## 2-7: Constraint using `keyof`

**Definition**: The `keyof` constraint limits a generic type to the keys of an object.

**Example**:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
console.log(getProperty(person, "name")); // "Alice"
```

**Interview Question**:

- **Q**: What does `keyof` do in TypeScript?
  **A**: `keyof` restricts a type to the keys of a specified object, improving type safety.

---

## 2-8: Asynchronous TypeScript

**Definition**: TypeScript supports asynchronous programming with `async` and `await` just like JavaScript, but with type safety for promises.

**Example**:

```typescript
async function fetchData(): Promise<string> {
  return "Data fetched";
}

fetchData().then(console.log);
```

**Interview Question**:

- **Q**: How does TypeScript handle async/await?
  **A**: TypeScript allows async/await with type-safe promises to ensure the data returned matches the expected type.

---

## 2-9: Conditional Types

**Definition**: Conditional types enable different types based on conditions. This can help make types more dynamic.

**Example**:

```typescript
type IsString<T> = T extends string ? "It's a string" : "Not a string";

type Test1 = IsString<string>; // "It's a string"
type Test2 = IsString<number>; // "Not a string"
```

**Interview Question**:

- **Q**: What is a conditional type?
  **A**: A type that changes based on a condition, similar to a ternary operator but for types.

---

## 2-10: Mapped Types

**Definition**: Mapped types allow creating new types by transforming properties of an existing type.

**Example**:

```typescript
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

const person: ReadOnly<Person> = { name: "Alice", age: 25 };
// person.age = 30; // Error: age is read-only
```

**Interview Question**:

- **Q**: What is a mapped type?
  **A**: Mapped types create new types by modifying properties of an existing type.

```

```
