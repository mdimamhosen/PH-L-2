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

  const task7 = <T>(input: T): void => {
    if (typeof input === "string") {
      console.log("Length of the string:", input.length);
    } else if (typeof input === "number") {
      console.log("Square of the input is:", input * input);
    }
  };
  task7<string>("Hello");
  task7<number>(7);

  // Task 8
  /*
  Task 8: Intersection Types
  Objective: Practice using intersection types.

  Instructions:

  Create a type AdminUser that is an intersection of:
  User with properties name and email
  Admin with property adminLevel
  Write a function describeAdmin(user: AdminUser): string that returns a description of the admin user.
*/

  interface User {
    name: string;
    email: string;
  }

  interface AdminLevel {
    priority: string;
  }

  type adminUser = User & AdminLevel;

  const user: User = {
    name: "John Doe",
    email: "test@gmail.com",
  };
  const adminLevel: AdminLevel = {
    priority: "top",
  };
  const userWithLevel: adminUser = { ...user, ...adminLevel };

  console.log(userWithLevel);

  // Task 9
  /*
 Task 9: Optional Chaining
  Objective: Use optional chaining with nested objects.

  Instructions:

  Write a function getEmployeeCity(employee) that safely retrieves the city of an employee from a nested object using optional chaining.
 */
  interface Address {
    city?: string;
  }
  interface Employee {
    name: string;
    address?: Address;
  }

  const getEmployeeCity = (employee: Employee): string | undefined => {
    return employee?.address?.city;
  };

  const employee1: Employee = {
    name: "Employ One",
    address: {
      city: "San Francisco",
    },
  };
  const employee2: Employee = {
    name: "Employ Two",
  };

  console.log(getEmployeeCity(employee1));
  console.log(getEmployeeCity(employee2));
  // Task 10
  /*
  Task 10: Nullish Coalescing
  Objective: Handle null and undefined values using nullish coalescing.

  Instructions:

  Write a function getDisplayName(name: string | null | undefined): string that returns "Anonymous" if name is null or undefined.
  */

  const getDisplayName = (name: string | null | undefined): string => {
    return name ?? "Anonymous";
  };
  console.log(
    "\n",
    getDisplayName(undefined),

    "\n",
    getDisplayName(null),
    "\n",
    getDisplayName("Imam")
  );

  // Task 11
  /*
  Task 11: Unknown Type
  Objective: Handle different types with the unknown type.

  Instructions:
  Write a function processData(data: unknown) that:
  Checks if data is a string and returns the uppercased version.
  If data is a number, returns the square of it.
  */
  function processData(data: unknown): string | number | undefined {
    if (typeof data === "string") {
      return data.toUpperCase();
    } else if (typeof data === "number") {
      return data * data;
    }
    return undefined;
  }

  // Example usage:
  console.log(processData("hello")); // Outputs: "HELLO"
  console.log(processData(4)); // Outputs: 16
  console.log(processData(true)); // Outputs: undefined

  // Task 12
  /*
  Task 12: Never Type
  Objective: Use the never type for functions that don’t return.

  Instructions:

  Write a function handleError that:
  Accepts a message: string.
  Throws an error with the given message.
  Use the never return type to indicate that this function never returns.
*/
  const neverType = (message: string): never => {
    throw new Error(message);
  };

  // neverType("This function never returns");
  // Task 13
  /*
  Task 13: Generics with Functions and Interfaces
  Objective: Use generics to handle different types.

  Instructions:

  Create a generic function that:
  Accepts an array of any type.
  Returns a new array with duplicate values removed.
  */

  type genericFunction<T> = T[];

  const genericFunctionRemovingDuplicates = <T>(
    args: genericFunction<T>
  ): genericFunction<T> => {
    return Array.from(new Set(args));
  };

  console.log(genericFunctionRemovingDuplicates([1, 2, 3, 1, 3, 4, 2]));
  console.log(
    genericFunctionRemovingDuplicates(["OK", "OK", "OK", "OK", "I'm"])
  );
  // Task 14
  /*
  Task 14: Asynchronous TypeScript and Type Aliases
  Objective: Simulate an asynchronous operation with TypeScript.

  Instructions:

  Write an asynchronous function that:
  Simulates fetching user data (containing name and age).
  Returns the data after a short delay.
  */

  interface UserDataTask14 {
    name: string;
    age: number;
  }

  const getUserData = (): Promise<UserDataTask14> => {
    return new Promise<UserDataTask14>((resolve, reject) => {
      const data: UserDataTask14 = {
        name: "Imam",
        age: 3,
      };
      if (data) {
        resolve(data);
      } else {
        reject("No data found");
      }
    });
  };

  const showUserTask14 = async (): Promise<UserDataTask14 | void> => {
    try {
      const newData = await getUserData();
      console.log(newData.age);
      console.log(newData.name);
      return newData;
    } catch (error: unknown) {
      console.log("Error: ", error);
    }
  };

  showUserTask14();
  // Task 15
  /*
  Task 15: Type Guards
  Objective: Create custom type guards for more accurate type checking.

  Instructions:

  Write a function isString(value: unknown): value is string that checks if a value is a string.
  Use this in another function printUpperCase(value: unknown): void that prints the value in uppercase if it’s a string.
  */
  // Type guard to check if a value is a string
  function isString(value: unknown): value is string {
    return typeof value === "string";
  }

  // Function to print the value in uppercase if it's a string
  function printUpperCase(value: unknown): void {
    if (isString(value)) {
      console.log(value.toUpperCase());
    } else {
      console.log("The provided value is not a string.");
    }
  }

  // Example usage
  printUpperCase("hello");
  printUpperCase(123);
  printUpperCase(true);

  // Task 16
  /*
  Task 16: Utility Types and Keyof Constraints
  Objective: Access object properties dynamically using keyof.

  Instructions:

  Create a function that:
  Takes an object and a key.
  Returns the property value from the object based on the provided key.
  Use keyof to constrain the key to valid properties of the object.
  */

  const objectProperty = <T, k extends keyof T>(obj: T, key: k): T[k] => {
    return obj[key];
  };

  const userObject = {
    name: "Imam",
    age: 25,
    email: "test@example.com",
  };
  console.log(objectProperty(userObject, "name"));

  const propertyWithKey = <T, k extends keyof T>(obj: T, key: k) => {
    return obj[key];
  };

  const userObject2 = {
    name: "Imam",
    age: 25,
  };
  console.log(propertyWithKey(userObject2, "age"));
  //
}
