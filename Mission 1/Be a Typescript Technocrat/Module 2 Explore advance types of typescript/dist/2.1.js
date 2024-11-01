"use strict";
{
    //
    // type assertion
    let anything;
    anything = "hello";
    let strLength = anything.length;
    console.log(strLength);
    anything = 123;
    // strLength = (anything as string).length; // error
    console.log(strLength);
    //
}
