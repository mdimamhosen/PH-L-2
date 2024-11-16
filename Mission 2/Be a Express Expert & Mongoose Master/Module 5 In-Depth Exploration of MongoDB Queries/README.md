
# MongoDB Operations  

---

## 5-1-A Install MongoDB Compass & NoSQL Booster (Windows)

**MongoDB Compass** and **NoSQL Booster** are two GUI tools used for interacting with MongoDB databases.

- **MongoDB Compass**: Official MongoDB GUI tool that provides a visual interface to interact with the database.
- **NoSQL Booster**: A popular third-party MongoDB GUI tool that allows for more features and supports SQL-like syntax.

### Installation Steps (Windows)
1. **MongoDB Compass**:
   - Download MongoDB Compass Community Version from the [MongoDB official website](https://www.mongodb.com/products/compass).
   - Run the installer and follow the instructions.

2. **NoSQL Booster**:
   - Download NoSQL Booster from [https://nosqlbooster.com/](https://nosqlbooster.com/).
   - Launch NoSQL Booster once installed.

---

## 5-1-B Install MongoDB Compass & NoSQL Booster (Mac & Linux)

### Installation Steps (Mac/Linux)
1. **MongoDB Compass**:
   - On **macOS**, use Homebrew:
     ```bash
     brew tap mongodb/brew
     brew install mongodb-compass
     ```
   - On **Linux**, use the following:
     ```bash
     wget https://downloads.mongodb.com/compass/mongodb-compass-1.29.5-linux-x86_64.deb
     sudo dpkg -i mongodb-compass-1.29.5-linux-x86_64.deb
     ```

2. **NoSQL Booster**:
   - Download the `.dmg` file for macOS or `.tar.gz` file for Linux from the official site: [https://nosqlbooster.com/download](https://nosqlbooster.com/download).
   - Follow the installation instructions for your platform.

---

## 5-2 Insert, insertOne, find, findOne, Field Filtering, Project

### `insertOne()` Example:
```javascript
db.users.insertOne({
  name: "John Doe",
  age: 28,
  city: "New York"
});
```

### `insert()` (deprecated but still used in older versions):
```javascript
db.users.insert({
  name: "Jane Doe",
  age: 25,
  city: "Los Angeles"
});
```

### `find()` Example (with field filtering and projection):
```javascript
// Find all users and project only the name and age fields
db.users.find({}, { name: 1, age: 1 });
```

### `findOne()` Example:
```javascript
// Find a single user by name
db.users.findOne({ name: "John Doe" });
```

---

## 5-3 `$eq`, `$neq`, `$gt`, `$lt`, `$gte`, `$lte`

### Comparison Operators:
```javascript
// $eq: Matches values that are equal to the specified value
db.users.find({ age: { $eq: 28 } });

// $neq: Matches values that are not equal to the specified value
db.users.find({ age: { $neq: 30 } });

// $gt: Matches values that are greater than the specified value
db.users.find({ age: { $gt: 25 } });

// $lt: Matches values that are less than the specified value
db.users.find({ age: { $lt: 30 } });

// $gte: Matches values that are greater than or equal to the specified value
db.users.find({ age: { $gte: 25 } });

// $lte: Matches values that are less than or equal to the specified value
db.users.find({ age: { $lte: 30 } });
```

---

## 5-4 `$in`, `$nin`, Implicit and Explicit `AND` Condition

### `$in` Example:
```javascript
// Find users who are in either New York or Los Angeles
db.users.find({ city: { $in: ["New York", "Los Angeles"] } });
```

### `$nin` Example:
```javascript
// Find users who are not in either New York or Los Angeles
db.users.find({ city: { $nin: ["New York", "Los Angeles"] } });
```

### Implicit AND Condition:
```javascript
// Find users where both age > 20 and city is New York (Implicit AND)
db.users.find({ age: { $gt: 20 }, city: "New York" });
```

### Explicit AND Condition with `$and`:
```javascript
// Explicit AND condition using $and
db.users.find({ 
  $and: [{ age: { $gt: 20 } }, { city: "New York" }] 
});
```

---

## 5-5 `$and`, `$or`, Implicit vs Explicit

### `$and` Example:
```javascript
db.users.find({
  $and: [
    { age: { $gte: 20 } },
    { city: "New York" }
  ]
});
```

### `$or` Example:
```javascript
db.users.find({
  $or: [
    { age: { $gt: 25 } },
    { city: "Los Angeles" }
  ]
});
```

### Implicit `$or` and `$and` Example:
```javascript
// Implicit AND with Implicit OR (age > 25 and city is either New York or Los Angeles)
db.users.find({
  age: { $gt: 25 },
  $or: [{ city: "New York" }, { city: "Los Angeles" }]
});
```

---

## 5-6 `$exists`, `$type`, `$size`

### `$exists` Example:
```javascript
// Find documents where the 'email' field exists
db.users.find({ email: { $exists: true } });
```

### `$type` Example:
```javascript
// Find documents where the 'age' field is of type number
db.users.find({ age: { $type: "number" } });
```

### `$size` Example:
```javascript
// Find documents where the 'skills' array has exactly 3 elements
db.users.find({ skills: { $size: 3 } });
```

---

## 5-7 `$all`, `$elemMatch`

### `$all` Example:
```javascript
// Find users whose 'skills' array contains both "JavaScript" and "MongoDB"
db.users.find({ skills: { $all: ["JavaScript", "MongoDB"] } });
```

### `$elemMatch` Example (for nested arrays):
```javascript
// Find users with a skill object that matches both the name and level
db.users.find({
  skills: { 
    $elemMatch: { name: "JavaScript", level: { $gte: 3 } }
  }
});
```

---

## 5-8 `$set`, `$addToSet`, `$push`

### `$set` Example:
```javascript
// Update the city field to "Boston" for a specific user
db.users.updateOne(
  { name: "John Doe" },
  { $set: { city: "Boston" } }
);
```

### `$addToSet` Example:
```javascript
// Add "Python" to the skills array if it's not already present
db.users.updateOne(
  { name: "John Doe" },
  { $addToSet: { skills: "Python" } }
);
```

### `$push` Example:
```javascript
// Add "React" to the skills array
db.users.updateOne(
  { name: "John Doe" },
  { $push: { skills: "React" } }
);
```

---

## 5-9 `$unset`, `$pop`, `$pull`, `$pullAll`

### `$unset` Example:
```javascript
// Remove the 'email' field from the document
db.users.updateOne(
  { name: "John Doe" },
  { $unset: { email: "" } }
);
```

### `$pop` Example:
```javascript
// Remove the first element from the 'skills' array
db.users.updateOne(
  { name: "John Doe" },
  { $pop: { skills: -1 } }
);
```

### `$pull` Example:
```javascript
// Remove "Python" from the 'skills' array
db.users.updateOne(
  { name: "John Doe" },
  { $pull: { skills: "Python" } }
);
```

### `$pullAll` Example:
```javascript
// Remove multiple items from the 'skills' array
db.users.updateOne(
  { name: "John Doe" },
  { $pullAll: { skills: ["JavaScript", "Python"] } }
);
```

---

## 5-10 More about `$set`, How to Explore Documentation

# MongoDB `$set` Operator with Positional Operators

## Overview

The `$set` operator in MongoDB is used to update specific fields of a document. It can also add new fields if they do not exist. When working with arrays or nested structures, positional operators (like `$` and `$[<identifier>]`) allow precise updates.

---

## Basic Syntax of `$set`

```json
{
  "$set": {
    "field": <value>
  }
}
```

- **field**: The field to update.
- **value**: The new value to set.

---

## Examples with Positional Operators

### 1. Update the First Matching Array Element (`$`)

The `$` operator updates the first matching element in an array.

#### Example

```json
// Sample Document
{
  "_id": 1,
  "scores": [85, 90, 78]
}

// Update Query
db.collection.updateOne(
  { _id: 1, "scores": 90 },
  { $set: { "scores.$": 95 } }
)

// Updated Document
{
  "_id": 1,
  "scores": [85, 95, 78]
}
```

---

### 2. Update All Matching Array Elements (`$[]`)

The `$[]` operator updates all elements in an array.

#### Example

```json
// Sample Document
{
  "_id": 2,
  "grades": [60, 70, 80]
}

// Update Query
db.collection.updateOne(
  { _id: 2 },
  { $set: { "grades.$[]": 85 } }
)

// Updated Document
{
  "_id": 2,
  "grades": [85, 85, 85]
}
```

---

### 3. Update Specific Array Elements Using Filters (`$[<identifier>]`)

The `$[<identifier>]` operator updates elements based on a filter condition.

#### Example

```json
// Sample Document
{
  "_id": 3,
  "scores": [65, 90, 78]
}

// Update Query
db.collection.updateOne(
  { _id: 3 },
  { $set: { "scores.$[score]": 100 } },
  { arrayFilters: [{ "score": { $gte: 80 } }] }
)

// Updated Document
{
  "_id": 3,
  "scores": [65, 100, 78]
}
```

---

### 4. Update Nested Objects

You can use `$set` to update specific fields inside a nested object.

#### Example

```json
// Sample Document
{
  "_id": 4,
  "details": {
    "name": "John",
    "age": 25
  }
}

// Update Query
db.collection.updateOne(
  { _id: 4 },
  { $set: { "details.age": 30 } }
)

// Updated Document
{
  "_id": 4,
  "details": {
    "name": "John",
    "age": 30
  }
}
```

---

### 5. Update Nested Arrays

You can use the `$` operator to update nested arrays.

#### Example

```json
// Sample Document
{
  "_id": 5,
  "categories": [
    {
      "name": "Electronics",
      "items": ["TV", "Radio"]
    },
    {
      "name": "Furniture",
      "items": ["Table", "Chair"]
    }
  ]
}

// Update Query
db.collection.updateOne(
  { _id: 5, "categories.name": "Electronics" },
  { $set: { "categories.$.items.0": "Smart TV" } }
)

// Updated Document
{
  "_id": 5,
  "categories": [
    {
      "name": "Electronics",
      "items": ["Smart TV", "Radio"]
    },
    {
      "name": "Furniture",
      "items": ["Table", "Chair"]
    }
  ]
}
```

---

### 6. Update Multiple Nested Elements with Array Filters

When working with deeply nested arrays, you can use array filters to target specific elements.

#### Example

```json
// Sample Document
{
  "_id": 6,
  "orders": [
    {
      "orderId": 1,
      "items": [
        { "product": "Laptop", "price": 1000 },
        { "product": "Mouse", "price": 50 }
      ]
    },
    {
      "orderId": 2,
      "items": [
        { "product": "Table", "price": 150 },
        { "product": "Chair", "price": 75 }
      ]
    }
  ]
}

// Update Query
db.collection.updateOne(
  { _id: 6 },
  { $set: { "orders.$[order].items.$[item].price": 200 } },
  {
    arrayFilters: [
      { "order.orderId": 2 },
      { "item.product": "Chair" }
    ]
  }
)

// Updated Document
{
  "_id": 6,
  "orders": [
    {
      "orderId": 1,
      "items": [
        { "product": "Laptop", "price": 1000 },
        { "product": "Mouse", "price": 50 }
      ]
    },
    {
      "orderId": 2,
      "items": [
        { "product": "Table", "price": 150 },
        { "product": "Chair", "price": 200 }
      ]
    }
  ]
}
```

---

## Using `$set` with Conditions in Nested Arrays

### Example: Update Specific Nested Array Elements
```javascript
db.orders.updateOne(
  { _id: 1 },
  { $set: { "items.$[item].discount": 10 } },
  { arrayFilters: [{ "item.product": "Phone" }] }
);
```
**Explanation**: Adds a `discount` field with a value of `10` to all `items` where the `product` is `Phone`.

---

## Other Examples

### Adding New Fields to Documents
```javascript
db.products.updateOne(
  { _id: 1 },
  { $set: { "specifications.color": "red" } }
);
```
**Explanation**: Adds a `color` field in the `specifications` sub-document.

### Updating Elements in Nested Arrays of Objects
```javascript
db.projects.updateOne(
  { _id: 1, "tasks.id": 101 },
  { $set: { "tasks.$.status": "completed" } }
);
```
**Explanation**: Updates the `status` field of the first `tasks` array element where `id` is `101`.

---

## 5-11 Delete Documents, `$sort`, Drop Collection, and How to Explore by Yourself

### Deleting Documents:
```javascript
// Delete a single document
db.users.deleteOne({ name: "John Doe" });

// Delete multiple documents
db.users.deleteMany({ city: "New York" });
```

### `$sort` Example:
```javascript


// Sort documents by age in ascending order
db.users.find().sort({ age: 1 });
```

### Drop Collection Example:
```javascript
// Drop the entire 'users' collection
db.users.drop();
```