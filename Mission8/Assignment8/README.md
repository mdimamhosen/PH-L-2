# 🚴 Bike Service Center Backend

A robust RESTful API built using **Node.js**, **Express.js**, **TypeScript**, and **Prisma ORM** to manage customers, bikes, and service records for a bike servicing center.

---

## 🌐 Live Link

> 🔗 [Live Link](https://bikeservicecenter.vercel.app/)  
> 📂 [GitHub Repository](https://github.com/mdimamhosen/Bike_Service_Center_Backend)

---

## 🧱 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **TypeScript** – Strong typing
- **Prisma ORM** – Database access
- **PostgreSQL** – Relational DB
- **Zod** – Request validation
- **UUIDs** – As primary keys

---

## 📦 Features

### 🔹 Customer Management

- Create, retrieve, update, and delete customers
- Each customer has: `name`, `email`, `phone`, `createdAt`

### 🔹 Bike Management

- Add, view, and get bikes by ID
- Each bike belongs to a customer

### 🔹 Service Management

- Create service records
- Track service status: `pending`, `in-progress`, `done`
- Complete services with optional completion date
- Retrieve overdue services (older than 7 days)

### 🔹 Soft Delete with `isDeleted`

- All major models (`Customer`, `Bike`, `ServiceRecord`) include a `isDeleted` field.
- Instead of permanently deleting entries, we mark them as deleted.
- Ensures safer data retention and possible future restoration.

---

## 🧯 Error Handling

Consistent error response structure:

```json
{
  "success": false,
  "status": 404,
  "message": "Customer not found",
  "stack": "Shown only in development"
}
```

---

## 🧪 API Endpoints Overview

### ✅ Customers

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/customers`     | Create a new customer |
| GET    | `/api/customers`     | Get all customers     |
| GET    | `/api/customers/:id` | Get customer by ID    |
| PUT    | `/api/customers/:id` | Update customer       |
| DELETE | `/api/customers/:id` | Soft delete customer  |

### ✅ Bikes

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| POST   | `/api/bikes`     | Add a new bike |
| GET    | `/api/bikes`     | Get all bikes  |
| GET    | `/api/bikes/:id` | Get bike by ID |
| PUT    | `/api/bikes/:id` | Get bike by ID |

### ✅ Services

| Method | Endpoint                     | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| POST   | `/api/services`              | Create a service record      |
| GET    | `/api/services`              | Get all service records      |
| GET    | `/api/services/:id`          | Get service by ID            |
| PUT    | `/api/services/:id/complete` | Complete a service           |
| GET    | `/api/services/status`       | Get pending/overdue services |

---

## 🗃 Database Schema (Prisma)

### Customer

```ts
model Customer {
  customerId String   @id @default(uuid())
  name       String
  email      String   @unique
  phone      String
  createdAt  DateTime @default(now())
  isDeleted  Boolean  @default(false)
  bikes      Bike[]
}
```

### Bike

```ts
model Bike {
  bikeId     String   @id @default(uuid())
  brand      String
  model      String
  year       Int
  customer   Customer @relation(fields: [customerId], references: [customerId])
  customerId String
  isDeleted  Boolean  @default(false)
  services   ServiceRecord[]
}
```

### ServiceRecord

```ts
model ServiceRecord {
  serviceId      String   @id @default(uuid())
  bike           Bike     @relation(fields: [bikeId], references: [bikeId])
  bikeId         String
  serviceDate    DateTime
  completionDate DateTime?
  description    String
  status         String
  isDeleted      Boolean  @default(false)
}
```

---

## 🧹 `isDeleted` Usage

Instead of hard deleting data from the database, we soft delete records by setting `isDeleted: true`.

### ✅ Benefits:

- Prevents accidental loss of data
- Allows auditing and recovery
- Enables filtering for only "active" records

### ⚙️ Implementation:

When fetching records, always add this condition:

```ts
where: {
  isDeleted: false;
}
```

---

## 🛠 Setup Guide

```bash
# 1. Clone repo
git clone https://github.com/mdimamhosen/Bike_Service_Center_Backend

# 2. Install dependencies
npm install

# 3. Setup .env file
cp .env.example .env

# 4. Configure your PostgreSQL DB in .env

# 5. Generate Prisma Client
npx prisma generate

# 6. Run migrations
npx prisma migrate dev --name init

# 7. Start the server
npm run dev
```

---

## 🔑 .env.example

```env
DATABASE_URL="postgresql://username:password@localhost:5432/bike_service"
PORT=5000
NODE_ENV=development
```

---

## 💡 Future Enhancements

- Authentication with JWT
- Admin dashboard
- Restore soft-deleted entries
- Paginated endpoints
- Email notifications on overdue services

---

## 🧑‍💻 Author

**[mdimamhosen](https://github.com/mdimamhosen)**  
🚀 Passionate about backend systems and database design
