
# MongoDB and NoSQL Booster Notes

## 5-1-A: Install MongoDB Compass & NoSQL Booster (Windows)

### MongoDB Compass
- MongoDB Compass is a GUI tool to interact with MongoDB databases visually.
- To install:
  1. Download MongoDB Compass from the official [MongoDB website](https://www.mongodb.com/try/download/compass).
  2. Follow the setup instructions for Windows.
  3. Launch MongoDB Compass and connect to your MongoDB instance.

### NoSQL Booster
- NoSQL Booster is a MongoDB GUI client that also supports MongoDB shell commands.
- To install:
  1. Download NoSQL Booster from the [NoSQL Booster website](https://nosqlbooster.com/downloads).
  2. Follow the installation instructions for Windows.
  3. Open NoSQL Booster and connect to your MongoDB instance.


## 5-2: MongoDB CRUD Operations

### `insert` and `insertOne`
- **`insert`**: Inserts multiple documents into a collection.
  ```javascript
  db.collection.insert([{ field1: "value1" }, { field1: "value2" }]);
  ```
- **`insertOne`**: Inserts a single document into a collection.
  ```javascript
  db.collection.insertOne({ field1: "value1", field2: "value2" });
  ```

### `find` and `findOne`
- **`find`**: Retrieves multiple documents matching the query criteria.
  ```javascript
  db.collection.find({ field1: "value1" });
  ```
- **`findOne`**: Retrieves a single document that matches the query criteria.
  ```javascript
  db.collection.findOne({ field1: "value1" });
  ```

 