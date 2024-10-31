{
  // ternary operator || Optional Chaining || Nullish Coalescing Operator

  const age: number = 44;
  const myAge: number = age || 25;
  console.log(myAge); // 25

  age > 30
    ? console.log("Age is greater than 30")
    : console.log("Age is less than 30 or equal to 30");

  // nullish coalescing operator
  const myAge2: number = age ?? 25;
  console.log(myAge2); // 44  // 44 is not null or undefined

  const address = null;
  const newAddress = address ?? "Bangalore";
  console.log(newAddress); // Bangalore

  // optional chaining
  const user = {
    name: "John",
    age: 44,
    address: {
      city: "Bangladesh",
    },
  };
  console.log(user.address?.city); // Bangladesh
}
