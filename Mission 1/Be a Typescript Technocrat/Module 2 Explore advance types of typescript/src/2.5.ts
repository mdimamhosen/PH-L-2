{
  //
  //   Function With Generics
  const createArray = (params: string): string[] => {
    return [params];
  };
  const result = createArray("Hello");
  console.log(result); // ["Hello"]

  //   Generic Function
  const createArrayWithGeneric = <T>(param: T): T[] => {
    return [param];
  };

  const result2 = createArrayWithGeneric<string>("Hello");
  console.log(result2); // ["Hello"]
  const result3 = createArrayWithGeneric<number>(10);
  console.log(result3); // [10]
  interface Person {
    name: string;
  }
  const result4 = createArrayWithGeneric<Person>({ name: "John" });
  console.log(result4); // [{name: "John"}]

  const addCourseStudent = <T, U, V>(course: T, student: U, details: V) => {
    const newCourse = "Course: " + course;
    return {
      course: newCourse,
      student,
      ...details,
    };
  };

  const result5 = addCourseStudent<
    string,
    string,
    { age: number; address: string }
  >("TypeScript", "John", { age: 25, address: "USA" });
  console.log(result5); // {course: "Course: TypeScript", student: "John", age: 25}
  //
}
