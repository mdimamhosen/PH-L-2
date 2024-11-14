
# MongoDB Operations  

This document provides notes on essential MongoDB operations and concepts with examples for each of the following topics.

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

- **`$set`**: Used to update fields or add new fields to documents.
- **Exploring MongoDB Documentation**: Always check the [official MongoDB documentation](https://docs.mongodb.com/) for more examples and detailed explanations on each operator.

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

### Drop Collection Example:
```javascript
// Drop the entire 'users' collection
db.users.drop();
```