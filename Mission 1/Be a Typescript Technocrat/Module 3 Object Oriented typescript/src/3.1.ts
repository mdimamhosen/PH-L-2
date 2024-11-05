{
  // Object Oriented Programming

  // Class Property in OOP
  class Animal {
    private name: string;
    private species: string;
    private sound: string;

    constructor(name: string, species: string, sound: string) {
      this.name = name;
      this.species = species;
      this.sound = sound;
    }
  }

  let cat = new Animal("Kitty", "Cat", "Meow");
  console.log(cat);

  // Parameter Properties in OOP

  class Person {
    constructor(public name: string, public age: number) {}
  }

  let person = new Person("John", 30);
  console.log(person);
}
