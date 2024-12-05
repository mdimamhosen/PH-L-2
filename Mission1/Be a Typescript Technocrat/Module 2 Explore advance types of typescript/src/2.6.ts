{
  //
  // Constrains In TypeScript

  // Function with a generic type T constrained to have a length property
  function logLength<T extends { length: number }>(arg: T): T {
    console.log(arg.length);
    return arg;
  }

  // Example usage
  logLength("Hello, world!"); // Logs: 13
  logLength([1, 2, 3, 4, 5]); // Logs: 5
  logLength({ length: 10, value: 42 }); // Logs: 10

  const addCourseTS = <T extends { name: string; id: number; email: string }>(
    course: T
  ): T => {
    return course;
  };
  const student1 = addCourseTS({
    name: "TypeScript",
    email: "test@example.com",
    id: 1,
  });
  console.log(student1);

  const student2 = addCourseTS({
    name: "TypeScript",
    email: "",
    id: 3,
    enum: "Enum",
  });
  console.log(student2);
}
