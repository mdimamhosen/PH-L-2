{
  //
  // Generics in TypeScript

  const rollNumber: number[] = [1, 2, 3, 4, 5];

  console.log(rollNumber);

  const mentors: string[] = ["John", "Doe", "Jane", "Doe"];
  console.log(mentors);

  const boolArray: boolean[] = [true, false, true, false];
  console.log(boolArray);

  // Generics in TypeScript
  // Generics are used to create reusable components.
  // It is used to create components that can work over a variety of types rather than a single one.

  const rollNumber2: Array<number> = [1, 2, 3, 4, 5];
  const mentors2: Array<string> = ["John", "Doe", "Jane", "Doe"];
  const boolArray2: Array<boolean> = [true, false, true, false];

  console.log(rollNumber2);
  console.log(mentors2);
  console.log(boolArray2);

  type GenericType<T> = Array<T>;

  const rollNumber3: GenericType<number> = [1, 2, 3, 4, 5];
  const mentors3: GenericType<string> = ["John", "Doe", "Jane", "Doe"];
  const boolArray3: GenericType<boolean> = [true, false, true, false];

  type T = number | string | boolean;
  //   create a generic array of type T
  const genericArray: GenericType<T> = [1, true, "imam"];
  console.log(genericArray);
  //   --->>

  const newUser: GenericType<{
    name: string;
    age: number;
  }> = [
    {
      name: "John",
      age: 28,
    },
    {
      name: "Jane",
      age: 25,
    },
  ];
  console.log(newUser);

  // --->> Generic Tuple

  type Human<x, y, z> = [x, y, z];

  const human: Human<string, number, boolean> = ["John", 28, true];

  console.log(human); // ["John", 28, true]

  const humanObject: Human<{ name: string; age: number }, string, boolean> = [
    { name: "John", age: 28 },
    "Jane",
    true,
  ];
  console.log(humanObject); // [{ name: 'John', age: 28 }, 'Jane', true]

  // here we decalre a type Human which is a tuple of 3 elements
  // then we declare a variable personType which is an object with 3 properties
  // then we declare a variable person2 which is a tuple of 3 elements
  // then we assign the values to the tuple
  // then we log the tuple
  type personType = {
    name: string;
    age: number;
    isStudent: boolean;
  };

  const person2: Human<personType, string, boolean> = [
    {
      name: "John",
      age: 28,
      isStudent: true,
    },
    "Jane",
    true,
  ];
  console.log(person2); // [{ name: 'John', age: 28, isStudent: true }, 'Jane', true]    // --->> Generic Tuple
  //
}
