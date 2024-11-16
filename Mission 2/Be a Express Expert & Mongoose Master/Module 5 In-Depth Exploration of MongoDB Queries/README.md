
# MongoDB Operations  

## What is MongoDB Aggregation?

### MongoDB Aggregation is a powerful framework for data aggregation operations, such as filtering, transforming, and summarizing data stored in a MongoDB collection. It processes data records and returns computed results. Aggregation operations group values from multiple documents together and can perform a variety of operations on the grouped data to return a single result.

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

Here’s a detailed explanation of the `$set` operator in MongoDB, including its use with positional operators and examples for arrays, objects, nested objects, and nested arrays, formatted as a `README.md` file:

```markdown
# MongoDB `$set` Operator and Positional Operators

The `$set` operator in MongoDB is used to update the value of a field in a document. If the field does not exist, `$set` creates it.

This document explains `$set` in detail, including its use with positional operators to handle arrays, objects, nested objects, and nested arrays.

## Basic Usage of `$set`

```javascript
db.collection.updateOne(
  { _id: 1 },
  { $set: { field: "newValue" } }
);
```

## Using `$set` with Arrays

### Update Specific Array Element with Positional Operator `$`

The `$` operator identifies the first array element that matches the query.

#### Example: Update the first matching element
```javascript
db.students.updateOne(
  { _id: 1, grades: { $gte: 80 } },
  { $set: { "grades.$": 85 } }
);
```
**Explanation**: Updates the first grade `>= 80` to `85`.

### Update Specific Index in Array
```javascript
db.students.updateOne(
  { _id: 1 },
  { $set: { "grades.2": 90 } }
);
```
**Explanation**: Updates the third element in the `grades` array to `90`.

---

## Using `$set` with Nested Objects

### Example: Add or Update Fields in Nested Objects
```javascript
db.users.updateOne(
  { _id: 1 },
  { $set: { "profile.name": "John Doe" } }
);
```
**Explanation**: Updates the `name` field in the `profile` sub-document.

### Example: Update Nested Fields
```javascript
db.users.updateOne(
  { _id: 1 },
  { $set: { "profile.address.city": "New York" } }
);
```
**Explanation**: Updates the `city` field in the nested `address` object inside `profile`.

---

## Using `$set` with Nested Arrays

### Update an Element in a Nested Array with Positional Operator
```javascript
db.orders.updateOne(
  { _id: 1, "items.product": "Laptop" },
  { $set: { "items.$.quantity": 10 } }
);
```
**Explanation**: Updates the `quantity` field for the first `items` array element where `product` is `Laptop`.

### Update All Elements in a Nested Array Using `$[]`
The `$[]` operator updates all elements in an array.

```javascript
db.orders.updateOne(
  { _id: 1 },
  { $set: { "items.$[].discount": 5 } }
);
```
**Explanation**: Adds a `discount` field with a value of `5` to all elements in the `items` array.

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