{
  // union types

  type unionExample = number | string;
  const newExample: unionExample = "hello";
  console.log(newExample); // hello
  const newExample2: unionExample = 10;
  console.log(newExample2); // 10
  // or
  let a: number | string;
  a = 10;
  console.log(a); // 10
  a = "hello";
  console.log(a); // hello

  // type guards
  function addWithUnion(arg1: string | number, arg2: string | number) {
    if (typeof arg1 === "string" || typeof arg2 === "string") {
      return `${arg1}${arg2}`;
    }
    return arg1 + arg2;
  }
  console.log(addWithUnion(10, 20)); // 30
  console.log(addWithUnion("10", 20)); // 1020
  console.log(addWithUnion(10, "20")); // 1020
  console.log(addWithUnion("10", "20")); // 1020

  // intersection types

  interface User {
    name: string;
    age: number;
  }

  interface Admin {
    role: string;
  }

  type AdminUser = User & Admin;

  const personOne: AdminUser = {
    name: "John",
    age: 30,
    role: "Admin",
  };

  //   or
  let userAdmin: User & Admin;
  userAdmin = {
    name: "Jane",
    age: 30,
    role: "Admin",
  };
  console.log(userAdmin); // { name: 'Jane', age: 30, role: 'Admin' }

  //New Example

  type FrontEndDeveloper = {
    skills: string[];
    framework: string;
  };
  type BackEndDeveloper = {
    skills: string[];
    database: string;
  };

  type FullStackDeveloper = FrontEndDeveloper & BackEndDeveloper;
  type developer = FrontEndDeveloper | BackEndDeveloper;

  const Imam: FullStackDeveloper = {
    skills: ["React", "JavaScript", "TypeScript"],
    framework: "React",
    database: "MongoDB",
  };
  //   const Imam2: FullStackDeveloper = {
  //     skills: ["React", "JavaScript", "TypeScript"],
  //     framework: "React",
  //   };
  // Error: Property 'database' is missing in type '{ skills: string[]; framework: string; }' but required in type 'FullStackDeveloper'.
  //   const Imam3: FullStackDeveloper = {
  //     skills: ["React", "JavaScript", "TypeScript"],
  //     database: "MongoDB",
  //   };
  // Error: Property 'framework' is missing in type '{ skills: string[]; database: string; }' but required in type 'FullStackDeveloper'.

  const John: developer = {
    skills: ["React", "JavaScript", "TypeScript"],
    framework: "React",
  };
  const John2: developer = {
    skills: ["React", "JavaScript", "TypeScript"],
    database: "MongoDB",
  };

  const John3: developer = {
    skills: ["React", "JavaScript", "TypeScript"],
    framework: "React",
    database: "MongoDB",
  };
}
