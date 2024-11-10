{

    // Type Guard using  typeof & in IN OOP
    // Animal Class
    class Animal {
    private name: string;
    private species: string;
    private sound: string;

    constructor(name: string, species: string, sound: string) {
        this.name = name;
        this.species = species;
        this.sound = sound;
    }

    makeSound() {
        console.log(`${this.name} says ${this.sound}`);
    }
    }

    // Person Class
    class Person {
    constructor(public name: string, public age: number) { }
    }

    // Type Guard for Animal class
    function isAnimal(obj: any): obj is Animal {
    return obj instanceof Animal;  // Checks if 'obj' is an instance of the Animal class
    }

    // Type Guard for Person class
    function isPerson(obj: any): obj is Person {
    return 'name' in obj && 'age' in obj;  // Checks if 'name' and 'age' properties exist
    }

    // Type Guard for string type (using typeof)
    function isString(obj: any): obj is string {
    return typeof obj === 'string';  // Checks if the type of obj is a string
    }

    // Type Guard for number type (using typeof)
    function isNumber(obj: any): obj is number {
    return typeof obj === 'number';  // Checks if the type of obj is a number
    }

    // Test instances
    let cat = new Animal("Kitty", "Cat", "Meow");
    let person = new Person("John", 30);
    let message = "Hello, World!";
    let num = 42;

    // Function to demonstrate the usage of type guards
    function printInfo(obj: Animal | Person | string | number) {
    if (isAnimal(obj)) {
        obj.makeSound();
    } else if (isPerson(obj)) {
        console.log(`${obj.name} is ${obj.age} years old.`);
    } else if (isString(obj)) {
        console.log(`The message is: ${obj}`);
    } else if (isNumber(obj)) {
        console.log(`The number is: ${obj}`);
    } else {
        console.log("Unknown object type.");
    }
    }

    // Testing the function with different types
    printInfo(cat);      // Output: Kitty says Meow
    printInfo(person);   // Output: John is 30 years old
    printInfo(message);  // Output: The message is: Hello, World!
    printInfo(num);      // Output: The number is: 42

    
}