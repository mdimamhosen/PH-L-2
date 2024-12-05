{
  //
  //   Utility Types

  //---------------------------------------------------------------->> Pick

  //   Pick<Type, Keys>

  interface Person {
    name: string;
    age: number;
    email?: string;
    contactNo: string;
  }

  type Name = Pick<Person, "name">;
  type Age = Pick<Person, "age">;
  type Email = Pick<Person, "email">;
  type ContactNo = Pick<Person, "contactNo">;
  type nameAge = Pick<Person, "name" | "age">;

  //---------------------------------------------------------------->> Omit

  //   Omit<Type, Keys>

  type ContactInfo = Omit<Person, "name" | "age">;

  //---------------------------------------------------------------->> Required

  //   Required<Type>
  type requiredPerson = Required<Person>;

  //---------------------------------------------------------------->> Partial

  //   Partial<Type>
  type partialPerson = Partial<Person>;

  //---------------------------------------------------------------->> Readonly

  //   Readonly<Type>
  type readonlyPerson = Readonly<Person>;

  //---------------------------------------------------------------->> Record

  //   Record<Keys, Type>
  type RecordPerson = Record<"name" | "age", Person>;

  type User = {
    name: string;
    address: string;
  };
  type UserRecord = Record<string, string>;
  const aPerson: UserRecord = {
    name: "John Doe",
    address: "Dhaka",
    firstName: "John",
  };

  //  -------------------------------------------- Most used utility types is Record
  // Example:

  const response: Record<string, unknown> = {};

  //
}
