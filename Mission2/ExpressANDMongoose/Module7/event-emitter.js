
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// listener 1

    myEmitter.on("event1", () => {
        console.log("Event 1 has been occurred");
    });

// listener 2

    myEmitter.on("event2", () => {
        console.log("Event 2 has been occurred");
    });
    myEmitter.on("event2", () => {
        console.log("Event 2 has been occurred again");
    } );

// listener 3

    myEmitter.on("event3", (value) => {
      console.log(`Listener ${value}`);
    });


myEmitter.emit("event1");
myEmitter.emit("event2");
myEmitter.emit("event3", 3);
