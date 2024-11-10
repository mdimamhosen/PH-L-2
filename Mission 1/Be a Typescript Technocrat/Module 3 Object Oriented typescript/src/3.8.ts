{
    //
        // Polymorphism in TypeScript
    class Shape {
        getArea(): number {
            return 0;
        }
    }

    class Circle extends Shape {
        private radius: number;
        constructor(radius: number) {
            super();
            this.radius = radius;
        }
        getArea(): number {
            return Math.PI * this.radius * this.radius;
        }
    }

    class Rectangle extends Shape {
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

    let shape: Shape; 
    shape = new Circle(10);
    console.log('Area of Circle:', shape.getArea()); // Output: 314.1592653589793
    shape = new Rectangle(10, 5);
    console.log('Area of Rectangle:', shape.getArea()); // Output: 50
    
   
    //
}