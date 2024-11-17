## Mongoose Aggregation Framework

Mongoose provides a powerful **Aggregation Framework** that allows you to perform complex queries and transformations on your data directly within the database. Aggregation operations process data records and return computed results, such as filtering, grouping, sorting, or reshaping documents.

### Example:

```javascript
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  age: Number,
  city: String
});

const User = mongoose.model('User', UserSchema);

// Aggregation example: Find average age of users by city
User.aggregate([
  { $group: { _id: "$city", averageAge: { $avg: "$age" } } }
])
.then(result => {
  console.log(result);
})
.catch(err => {
  console.error(err);
});
