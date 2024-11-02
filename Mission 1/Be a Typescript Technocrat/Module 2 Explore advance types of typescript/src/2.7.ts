{
  //

  //   Generic Constraints With KeyOf operator

  type Vehicle = {
    bike: string;
    car: string;
    ship: string;
  };

  type Owner = "bike" | "car" | "ship"; // manually define the type

  type Owner2 = keyof Vehicle; // using keyOf operator to get the type

  const person1: Owner = "bike";
  const person2: Owner2 = "car";
  console.log(person1, `\n`, person2);

  //    Very useful when you want to get the value of a key from an object

  //   Here we are using the keyOf operator to get the type of the keys of the object and then using the generic constraints to get the value of the key from the object.

  const getValue = <X, Y extends keyof X>(obj: X, key: Y) => {
    return obj[key];
  };

  const vehicle = {
    bike: "Honda",
    car: "Toyota",
    ship: "Titanic",
  };

  console.log(getValue(vehicle, "bike"));

  //
}
