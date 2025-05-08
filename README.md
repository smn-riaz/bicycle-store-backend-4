# 🚲 CycleHouse

A responsive full-stack e-commerce platform designed for bicycle enthusiasts. CycleHouse enables users to browse and buy bicycles with secure authentication and online payments. Built using the MERN stack with TypeScript and Redux Toolkit, it features a dynamic search, filtering, and an admin dashboard for managing inventory and orders.

---

## 🌐 Live Links

- 🌍 Client Website: [https://bicycle-store-assignment4-client.vercel.app](https://bicycle-store-assignment4-client.vercel.app)
- 🛠️ Server API: [https://bicycle-store-assignment4-backend.vercel.app](https://bicycle-store-assignment4-backend.vercel.app)
- 💻 Client GitHub Repo: [smn-riaz/biCycle-store-frontend-4](https://github.com/smn-riaz/biCycle-store-frontend-4)
- ⚙️ Backend GitHub Repo: [smn-riaz/biCycle-store-backend-4](https://github.com/smn-riaz/biCycle-store-backend-4)

---

## 📸 Screenshot

![CycleHouse Screenshot](https://github.com/user-attachments/assets/8fb1c50b-5895-46a5-b2d3-b58f056ec0f5)

---

## 🚀 Core Features

### 👥 User Features

- Register and log in securely using JWT authentication
- Browse bicycles by category, type, and brand
- Dynamic search and filtering by name, category, and price
- View detailed product pages with specifications and images
- Add products to cart and place orders
- Secure online payments via SSLCommerz
- View past orders and order statuses in user dashboard

### 🛠️ Admin Features

- Admin dashboard with role-based access control
- Add, update, or delete bicycles from inventory
- Manage users and view all registered accounts
- Review, process, and update customer orders
- Monitor customer reviews and feedback

---

## 🧰 Technologies & Versions

### 🖥️ Frontend

- React.js (v19.0.0)
- TypeScript (v5.7.2)
- Tailwind CSS (v3.4.17)
- Redux Toolkit (v2.5.1)
- RTK Query
- Redux Persist (for state persistence) (v6.0.0)
- React Router DOM (v7.2.0)

### 🛠 Backend

- Node.js (v22.13.1)
- Express.js (v4.21.2)
- MongoDB (v6.13.0)
- Mongoose (v8.10.0)
- Bcrypt.js (v5.0.2)
- JSON Web Token - JWT (v9.0.8)
- Zod (v3.24.2) for data validation
- SSLCommerz API for payments

---

## ⚠️ Major Challenges

- 🔐 Secure Authentication: JWT integration with route protection and token expiration
- 🧠 Redux State Persistence: Configured redux-persist to maintain login state across reloads
- 🔍 Advanced Filtering: Real-time product filtering with efficient query performance
- 📊 Order Consistency: Managing product stock and syncing order data in real time
- 📱 UI Design: Building a responsive UI that works seamlessly on all screen sizes

---

## 🔮 Future Plans

- ⭐ Enable customers to leave reviews and rate bicycles
- 🚚 Add real-time order tracking and delivery status
- 🎁 Implement promotional discount codes
- ❤️ Add wishlist and save-for-later functionality
- 💬 Real-time chat support with admins using Socket.io

---

## 🛠️ Getting Started Locally

### Prerequisites

- Node.js v20+
- MongoDB Atlas or local instance
- SSLCommerz Sandbox account for payments

### Setup Instructions

1. Clone the repos:
   ```bash
   git clone https://github.com/smn-riaz/biCycle-store-frontend-4
   git clone https://github.com/smn-riaz/biCycle-store-backend-4
