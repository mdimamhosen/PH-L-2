{
    //
    // Abstraction in Object-Oriented Programming

    // Abstraction is the concept of object-oriented programming that "shows" only essential attributes and "hides" unnecessary information.
    //----------------------------------------------*************----------------------------------------------

    
    // The main difference between an interface and an abstract class is that a class can implement multiple interfaces but can inherit only one abstract class. Also, methods of an interface must be implemented in the derived class, whereas an abstract class can have both implemented and non-implemented methods. An abstract class can have constructors, but an interface cannot have constructors. An abstract class can have fields, but an interface cannot have fields. An abstract class can have access modifiers, but an interface cannot have access modifiers. An abstract class can have method implementations, but an interface cannot have method implementations. An abstract class can have fields, constructors, and access modifiers, but an interface cannot have fields, constructors, and access modifiers.
    
    
    //----------------------------------------------*************----------------------------------------------

    // 2 ways to achieve abstraction in TypeScript: 1. interface, 2. abstract class

    // 1. Interface
    interface Shape {
        getArea(): number;
    }

    class Circle implements Shape {
        private radius: number;
        constructor(radius: number) {
            this.radius = radius;
        }
        getArea(): number {
            return Math.PI * this.radius * this.radius;
        }
    }

    class Rectangle implements Shape {
        private length: number;
        private breadth: number;
        constructor(length: number, breadth: number) {
            this.length = length;
            this.breadth = breadth;
        }
        getArea(): number {
            return this.length * this.breadth;
        }
    }

    let shape: Shape;

    shape = new Circle(10);
    console.log('Area of Circle:', shape.getArea()); // Output: 314.1592653589793
    shape = new Rectangle(10, 5);
    console.log('Area of Rectangle:', shape.getArea()); // Output: 50

    // 2. Abstract class
    abstract class Shape1 {
        abstract getArea(): number;
    }

    class Circle1 extends Shape1 {
        private radius: number;
        constructor(radius: number) {
            super();
            this.radius = radius;
        }
        getArea(): number {
            return Math.PI * this.radius * this.radius;
        }
    }

    class Rectangle1 extends Shape1 {
        private length: number;
        private breadth: number;
        constructor(length: number, breadth: number) {
            super();
            this.length = length;
            this.breadth = breadth;
        }
        getArea(): number {
            return this.length * this.breadth;
        }
    }

    let shape1: Shape1;
    shape1 = new Circle1(10);
    console.log('Area of Circle:', shape1.getArea()); // Output: 314.1592653589793
    shape1 = new Rectangle1(10, 5);
    console.log('Area of Rectangle:', shape1.getArea()); // Output: 50



    //
}