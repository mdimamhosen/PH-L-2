// Local modules
// const add2 = require('./local-1.js');
// const add3 = require('./local-2.js');
// console.log(add2(1, 2)); // 3
// console.log(add3(1, 2, 3)); // 6

// built-in modules

const path = require('path');
console.log(path.dirname(__filename)); // /Users/username/Projects/nodejs-examples
console.log(path.basename("E:/Web DSA/DEV/L - 2/Mission 2/Be a Express Expert & Mongoose Master/Module 7 Mastering The Foundation Of Express")); // index.js
console.log(path.extname("E:/Web DSA/DEV/L - 2/Mission 2/Be a Express Expert & Mongoose Master/Module 7 Mastering The Foundation Of Express/index.js")); // .js
console.log(path.parse("E:/Web DSA/DEV/L - 2/Mission 2/Be a Express Expert & Mongoose Master/Module 7 Mastering The Foundation Of Express/index.js")); // { root: 'E:/', dir: 'E:/Web DSA/DEV/L - 2/Mission 2/Be a Express Expert & Mongoose Master/Module 7 Mastering The Foundation Of Express', base: 'index.js', ext: '.js', name: 'index' }
console.log(path.join("E:/Web DSA/DEV/L - 2/Mission 2/Be a Express Expert & Mongoose Master/Module 7 Mastering The Foundation Of Express", "index.js")); // E:/Web DSA/DEV/L - 2/Mission 2/Be a Express Expert & Mongoose Master/Module 7 Mastering The Foundation Of Express/index.js
console.log(path.resolve("E:/Web DSA/DEV/L - 2/Mission 2/Be a Express Expert & Mongoose Master/Module 7 Mastering The Foundation Of Express", "index.js")); // E:\Web DSA\DEV\L - 2\Mission 2\Be a Express Expert & Mongoose Master\Module 7 Mastering The Foundation Of Express\index.js

