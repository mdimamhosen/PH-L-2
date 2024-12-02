 # MongoDB Aggregation Framework and Indexing Guide
<!--
## **1. Introduction to Aggregation Framework**

The aggregation framework is a powerful tool in MongoDB for data transformation and computation. It processes data in a pipeline, where each stage performs an operation on the input and passes the result to the next stage.

Example:

```javascript
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } },
]);
```

---

## **2. Key Aggregation Stages**

### **2.1 $match**

Filters documents based on specified criteria.

Example:

```javascript
db.orders.aggregate([{ $match: { status: "completed" } }]);
```

---

### **2.2 $project**

Shapes the output documents by specifying included or computed fields.

Example:

```javascript
db.orders.aggregate([
  {
    $project: {
      customerName: 1,
      totalPrice: { $multiply: ["$price", "$quantity"] },
    },
  },
]);
```

---

### **2.3 $addFields**

Adds new fields to documents or modifies existing ones.

Example:

```javascript
db.orders.aggregate([
  {
    $addFields: {
      discountPrice: { $multiply: ["$price", 0.9] },
    },
  },
]);
```

---

### **2.4 $group**

Groups documents by a specified key and performs aggregate computations.

Example:

```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$region",
      totalSales: { $sum: "$amount" },
      salesCount: { $count: {} },
    },
  },
]);
```

---

### **2.5 $push**

Adds arrays of values during grouping.

Example:

```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$region",
      itemsSold: { $push: "$item" },
    },
  },
]);
```

---

### **2.6 $out**

Writes the output of the pipeline to a new or existing collection.

Example:

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $out: "completedOrders" },
]);
```

---

### **2.7 $merge**

Writes the output into a target collection, merging with existing data.

Example:

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $merge: {
      into: "orders_summary",
      on: "_id",
      whenMatched: "merge",
      whenNotMatched: "insert",
    },
  },
]);
```

---

### **2.8 $unwind**

Deconstructs arrays into individual documents.

Example:

```javascript
db.orders.aggregate([{ $unwind: "$items" }]);
```

---

### **2.9 $bucket**

Groups documents into buckets based on specified boundaries.

Example:

```javascript
db.sales.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 50, 100, 200],
      default: "Other",
      output: { count: { $sum: 1 } },
    },
  },
]);
```

---

### **2.10 $facet**

Executes multiple pipelines within a single stage.

Example:

```javascript
db.orders.aggregate([
  {
    $facet: {
      totalSales: [{ $group: { _id: null, total: { $sum: "$amount" } } }],
      topCustomers: [
        { $group: { _id: "$customer", total: { $sum: "$amount" } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
      ],
    },
  },
]);
```

---

### **2.11 $lookup**

Performs joins between collections.

Example:

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails",
    },
  },
]);
```

---

## **3. Indexing in MongoDB**

### **3.1 What is Indexing?**

Indexes improve query performance by allowing MongoDB to locate data without scanning the entire collection.

### **3.2 COLLSCAN vs IXSCAN**

- **COLLSCAN**: Full collection scan.
- **IXSCAN**: Index scan, faster for indexed fields.

Example:

```javascript
db.orders.find({ status: "completed" }).explain("executionStats");
```

---

### **3.3 Compound Index**

Indexes on multiple fields to optimize queries.

Example:

```javascript
db.orders.createIndex({ customerId: 1, status: 1 });
```

---

### **3.4 Text Index**

Supports text search.

Example:

```javascript
db.articles.createIndex({ content: "text" });
db.articles.find({ $text: { $search: "MongoDB indexing" } });
```

---

## **4. Practical Examples**

### Example 1: Sales Analysis

```javascript
db.sales.aggregate([
  { $group: { _id: "$region", totalSales: { $sum: "$amount" } } },
  { $sort: { totalSales: -1 } },
]);
```

### Example 2: Customer Purchase History

```javascript
db.orders.aggregate([
  { $match: { customerId: "12345" } },
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails",
    },
  },
]);
```

---

## **5. Additional Notes**

- Use `$sort` and `$limit` for optimization.
- Always consider proper indexing strategies.
- Use `$merge` and `$out` cautiously to avoid data overwrite. -->
