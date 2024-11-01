{
  // 2.2.1
  // interface , type and inference
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

  // but we can't use type in interface

  type userWithRollNumber = Person & { rollNumber: rollNumber };
  let user: userWithRollNumber = {
    name: "John",
    age: 30,
    rollNumber: 123,
  };
  console.log(user); // { name: 'John', age: 30, rollNumber: 123 }
  //   let user2: userWithRollNumber = {
  //     name: "John",
  //     age: 30,
  //   }
  // console.log(user2); // { name: 'John', age: 30 } // error
  interface isStudent {
    isStudent: boolean;
  }
  // extends Person, isStudent, userWithRollNumber : multiple inheritance
  //
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

  // js --- > object , array --- > object , function --- > object

  type Roll = number[] | number;

  let roll: Roll = [1, 2, 3];
  console.log(roll); // [ 1, 2, 3 ]
  roll = 1;
  console.log(roll); // 1

  // here we have used interface for array where index is number and value is number as well, so we need to use index signature and type assertion as well to make it work as expected in typescript as below :
  interface Roll2 {
    [index: number]: number;
  }
  let roll2: Roll2 = [1, 2, 3];

  type Add = (a: number, b: number) => number;

  let add: Add = (a, b) => a + b;

  console.log(add(1, 2)); // 3
  //   console.log(add("1", 2)); // error

  interface Add2 {
    (a: number, b: number): number;
  }
  const add2: Add2 = (a, b) => a + b;
  console.log(add2(1, 4)); // 3

  //
}
