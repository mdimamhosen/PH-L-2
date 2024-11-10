{
    //  inheritance in typescript 
    class Person {
        constructor(public name: string) { }
        move(distance: number) {
            console.log(`${this.name} moved ${distance}m.`);
        }
    }
     
    class Employee extends Person {
        constructor(  name: string, public department: string) {
            super(name);
        }
        move(distance: number) {
            console.log(`${this.name} moved ${distance}m to the ${this.department} department.`);
        }
    }

    let person = new Person("John");
    person.move(10);
    let employee = new Employee("Jane", "Accounting");
    employee.move(20);
    
    //
}