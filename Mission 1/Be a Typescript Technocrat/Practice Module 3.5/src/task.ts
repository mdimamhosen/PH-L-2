{
  //
  // Task: 1
  /*
  ask 1: Basic Data Types and First Program
  Objective: Write a TypeScript program that outputs a welcome message.

  Instructions:

  Create a TypeScript program.
  Print the following message to the console:
  Hello World, I will complete this course successfully and become a Next level Web Developer!
*/

  const showWelcomeMessage = (): void => {
    console.log(`Welcome to the world of TypeScript!`);
    console.log(`Hello World, I will complete this course successfully and become a Next level Web Developer!
`);
  };

  showWelcomeMessage();

  // Task: 2
  /*
  Task 2: Functions, Optional, and Literal Types
  Objective: Create a function with parameters and an optional literal type.

  Instructions:

  Define a function that takes:
  name (string)
  age (number)
  role (optional, with type 'admin' | 'user' | 'guest')
  The function should log these values or perform a basic action.
*/
  type Role = "admin" | "user" | "guest";
  const functionWithOptionalType = (
    name: string,
    age: number,
    role?: Role
  ): void => {
    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    if (role) {
      console.log(`Role: ${role}`);
    }
  };

  functionWithOptionalType("John Doe", 25, "admin");

  // Task: 3
  /*
   Task 3: Object Types, Type Alias, & Literal Types
  Objective: Define a structured Person object using Type Aliases.

  Instructions:

  Define a Person type alias with properties for Name, Address, Hair and Eye Color, Income and Expense, Hobbies, Family Members, Job, Skills, Marital Status, and Friends.

  */

  type Person = {
    name: string;
    address: string;
    hairColor: string;
    eyeColor: string;
    income: number;
    expense: number;
    hobbies: string[];
    familyMembers: number;
    job: string;
    skills: string[];
    maritalStatus: string;
    friends: string[];
  };

  const person: Person = {
    name: "John Doe",
    address: "1234 Elm Street",
    hairColor: "Black",
    eyeColor: "Brown",
    income: 50000,
    expense: 25000,
    hobbies: ["Reading", "Traveling"],
    familyMembers: 4,
    job: "Web Developer",
    skills: ["HTML", "CSS", "JavaScript"],
    maritalStatus: "Married",
    friends: ["Jane Doe", "Alice Smith"],
  };
  console.log(person);

  // Task: 4
  /*
  Task 4: Union and Intersection Types
  Objective: Create union and intersection types using interfaces.

  Instructions:

  Define interfaces Book and Magazine.
  Create:
  A type that is a union of Book and Magazine.
  A type that is an intersection of Book and Magazine.
   */
  interface Book {
    title: string;
    author: string;
    pages: number;
  }
  interface Magazine {
    title: string;
    publisher: string;
    issue: number;
  }

  type BookOrMagazine = Book | Magazine;
  type BookAndMagazine = Book & Magazine;

  const book: Book = {
    title: "The Alchemist",
    author: "Paul Coelho",
    pages: 208,
  };
  const magazine: Magazine = {
    title: "National Geographic",
    publisher: "National Geographic Society",
    issue: 12,
  };

  const bookOrMagazine: BookOrMagazine = book;
  const bookAndMagazine: BookAndMagazine = { ...book, ...magazine };
  console.log(bookOrMagazine);
  console.log(bookAndMagazine);

  // Task: 5
  /*
  Task 5: Function Type
  Objective: Write a function that reverses a string.

  Instructions:

  Write a function reverseString that:
  Takes a single string argument.
  Returns the string in reverse order.
  Example:
  Input: "hello"
  Output: "olleh"
  */

  const reverseString = (value: string): string => {
    return value.split("").reverse().join("");
  };
  console.log(reverseString("hello"));
  // Task 6
  /*
  Task 6: Spread and Rest Operators, Destructuring
  Objective: Write a function that uses the rest operator for variable-length arguments.

  Instructions:

  Create a function that takes multiple numeric arguments (using the rest operator) and returns the sum of all arguments.
  */
  const spreadRestOperator = (...value: number[]): number => {
    const sum = value.reduce((sum, value) => sum + value, 0);
    return sum;
  };

  console.log(spreadRestOperator(2, 3, 4, 5, 6));
  // Task 7
  /*
  Task 7: Type Assertion and Narrowing
  Objective: Write a function that behaves differently based on the input type.

  Instructions:

  Create a function that accepts a parameter of type string | number.
  The function should:
  Return the length if the input is a string.
  Return the square if the input is a number.
  */

  type genericTask<T> = T;

  const task7 = <T>(input: T): void => {
    if (typeof input === "string") {
      console.log("Length of the string:", input.length);
    } else if (typeof input === "number") {
      console.log("Square of the input is:", input * input);
    }
  };

  task7<string>("Hello");
  task7<number>(7);

  //
}
