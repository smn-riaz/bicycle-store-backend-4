# 🚲 CycleHouse - Full-Stack E-commerce Platform for Bicycle Enthusiasts

CycleHouse is a responsive, full-stack e-commerce platform designed for bicycle enthusiasts. It allows users to browse and buy bicycles with secure authentication, online payments, and an intuitive user interface. Built with the MERN stack, TypeScript, and Redux Toolkit, CycleHouse offers a dynamic search, advanced filtering, and an admin dashboard for managing inventory and orders.

---

## 🌐 Live Links

- 🌍 **Client Website**: [CycleHouse Client](https://bicycle-store-assignment4-client.vercel.app)
- 🛠️ **Server API**: [CycleHouse API](https://bicycle-store-assignment4-backend.vercel.app)
- 💻 **Client GitHub Repo**: [smn-riaz/cyclehouse-frontend](https://github.com/smn-riaz/cyclehouse-frontend)
- ⚙️ **Backend GitHub Repo**: [smn-riaz/cyclehouse-backend](https://github.com/smn-riaz/cyclehouse-backend)

---

## 📸 Screenshot

![CycleHouse Screenshot](https://github.com/user-attachments/assets/8fb1c50b-5895-46a5-b2d3-b58f056ec0f5)

---

## 🚀 Core Features

### 👥 User Features

- 🔐 **Secure Login & Authentication**: User authentication using JWT (JSON Web Tokens) with protected routes and token expiration management.
- 🛒 **Browse Bicycles**: Dynamic search and filtering by category, type, and brand.
- 🔍 **Product Details**: View detailed product pages with specifications, images, and pricing.
- 🛍️ **Shopping Cart & Orders**: Add bicycles to the cart, place orders, and view order status in the user dashboard.
- 💳 **Online Payments**: Integrated SSLCommerz API for secure payment processing.
- 📜 **Order History**: View past orders and track order status.

### 🛠️ Admin Features

- 👨‍💼 **Admin Dashboard**: Role-based access control for admin users with CRUD operations for managing bicycle inventory.
- 📦 **Inventory Management**: Add, update, or delete bicycles from the inventory.
- 👥 **User Management**: View and manage registered users.
- 📝 **Order Management**: Review and process customer orders, monitor order statuses.
- 💬 **Customer Feedback**: Monitor and respond to customer reviews and feedback.

---

## 🧰 Technologies & Versions

### 🖥️ Frontend

- **React.js** (v19.0.0)
- **TypeScript** (v5.7.2)
- **Tailwind CSS** (v3.4.17)
- **Redux Toolkit** (v2.5.1)
- **RTK Query** (for data fetching)
- **Redux Persist** (for state persistence) (v6.0.0)
- **React Router DOM** (v7.2.0)

### 🛠 Backend

- **Node.js** (v22.13.1)
- **Express.js** (v4.21.2)
- **MongoDB** (v6.13.0)
- **Mongoose** (v8.10.0)
- **Bcrypt.js** (v5.0.2)
- **JSON Web Token - JWT** (v9.0.8)
- **Zod** (v3.24.2) for data validation
- **SSLCommerz API** (for payments)

---

## ⚠️ Major Challenges

- 🔐 **Secure Authentication**: JWT integration with route protection and token expiration management.
- 🧠 **Redux State Persistence**: Configured `redux-persist` to ensure the login state persists across page reloads.
- 🔍 **Advanced Filtering**: Efficient real-time filtering for product categories and price ranges.
- 📊 **Order Management**: Real-time syncing of product stock and order data.
- 📱 **Responsive UI**: Ensuring the platform is fully responsive and user-friendly across all screen sizes.

---

## 🔮 Future Plans

- ⭐ **Customer Reviews**: Enable customers to leave reviews and rate bicycles.
- 🚚 **Order Tracking**: Add real-time order tracking and delivery status.
- 🎁 **Promotions**: Implement discount codes and promotional offers.
- ❤️ **Wishlist**: Allow customers to save bicycles for later in a wishlist.
- 💬 **Real-time Support**: Integrate real-time chat with admins using Socket.io for customer support.

---

## 🛠️ Getting Started Locally

### Prerequisites

- **Node.js** (v20+)
- **MongoDB Atlas** or local MongoDB instance
- **SSLCommerz Sandbox Account** for payments

### Setup Instructions

1. Clone the repositories:
   ```bash
   git clone https://github.com/smn-riaz/cyclehouse-frontend
   git clone https://github.com/smn-riaz/cyclehouse-backend
