{
  // Type Aliases
  const student1: { name: string; age: number } = { name: "John", age: 25 };

  const student2: { name: string; age: number } = { name: "Jane", age: 26 };
  interface Student {}
  type StudentType = { name: string; age: number };
  const student3: StudentType = { name: "John", age: 25 };
  const student4: StudentType = { name: "Jane", age: 26 };
  console.log(student3);

}
