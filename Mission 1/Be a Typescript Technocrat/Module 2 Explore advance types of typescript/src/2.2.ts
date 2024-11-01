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

  //
}
