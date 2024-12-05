{
    //
    // Static Properties in OOP

    class Counter {
        static count: number = 0;
        constructor() {
            Counter.count++;
        }

        increment() {
            Counter.count++;  
          }
    }

    let obj1 = new Counter(); // Create an object of Counter class
    let obj2 = new Counter(); // Create an object of Counter class
    console.log(Counter.count); // Output: 2
    
    //
}