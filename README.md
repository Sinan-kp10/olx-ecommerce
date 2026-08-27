# OLX E-Commerce Application

A full-stack e-commerce marketplace platform modeled after OLX. Users can register, log in, list products for sale with image uploads, browse items, add them to a shopping cart, and complete checkouts.

---

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT stored in cookies and BcryptJS for password hashing.
- **Product Management**: Sell new products with multiple images, descriptions, categories, and prices.
- **Image Uploads**: Integrated with Cloudinary and Multer for seamless media hosting.
- **Shopping Cart**: Fully functional add-to-cart, quantity modification, and item removal flow.
- **Checkout Flow**: Simple checkout procedure with validation.
- **Interactive UI/UX**: Designed using SweetAlert2, React Toastify, React Router DOM, and Redux Toolkit.
- **TypeScript**: Typed end-to-end to ensure robustness and code quality.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **State Management**: Redux Toolkit & React Redux
- **Routing**: React Router DOM (v7)
- **Forms & Validation**: React Hook Form + Zod
- **Notifications**: React Toastify & SweetAlert2
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express (Express 5)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & Cookie-Parser
- **File Handling**: Multer & Cloudinary
- **Developer Experience**: TypeScript & `tsx` for live reloading

---

## 📂 Project Structure

```text
olx-ecommerce/
├── backend/            # Express REST API (TypeScript)
│   ├── src/
│   │   ├── config/     # Database and Cloudinary configuration
│   │   ├── controllers/# Route controllers (Auth, Products, Cart, etc.)
│   │   ├── middleware/ # Authentication and upload middlewares
│   │   ├── models/     # Mongoose schemas (User, Product, Cart, Order, etc.)
│   │   ├── routes/     # Express router definitions
│   │   └── server.ts   # Entry point
│   ├── .env            # Backend environment variables
│   └── package.json
│
├── frontend/           # React SPA Client (TypeScript + Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # View pages (Home, Product, Cart, Sell, Checkout)
│   │   ├── store/      # Redux state slices & store setup
│   │   └── main.tsx    # Entry point
│   ├── package.json
│   └── vite.config.ts
│
└── README.md           # Project Documentation (You are here)
```

---

## ⚙️ Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18+ recommended)
- A running [MongoDB](https://www.mongodb.com/) instance (local or MongoDB Atlas)
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### 1. Clone the Repository
```bash
git clone <repository-url>
cd olx-ecommerce
```

### 2. Configure the Backend
Navigate to the `backend/` folder and create a `.env` file:
```bash
cd backend
```
Create a `.env` file containing the following variables:
```env
PORT = 5000
MONGO_URI = mongodb://localhost:27017/olx-ecommerce
JWT_SECRET = your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_API_SECRET = your_cloudinary_api_secret
```

Install backend dependencies:
```bash
npm install
```

### 3. Configure the Frontend
Open a new terminal, navigate to the `frontend/` folder:
```bash
cd frontend
npm install
```

---

## 🏃 Running the Application

To run the application locally, you need to start both the backend API server and the frontend client dev server.

### Start the Backend
From the `backend/` directory:
```bash
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000).

### Start the Frontend
From the `frontend/` directory:
```bash
npm run dev
```
The Vite development server will start, typically on [http://localhost:5173](http://localhost:5173).

---

## 🔧 Scripts Reference

### Backend Scripts
- `npm run dev`: Starts the server with live reloading via `tsx watch`.
- `npm run build`: Compiles TypeScript files into the `dist/` directory.
- `npm start`: Runs the compiled JavaScript server from `dist/server.js`.

### Frontend Scripts
- `npm run dev`: Runs Vite dev server.
- `npm run build`: Compiles TypeScript and builds production bundles.
- `npm run lint`: Runs ESLint check.
- `npm run preview`: Previews the production build locally.

---

## 📝 License & Author

### Author
- **Sinan-kp10** - [GitHub Profile](https://github.com/Sinan-kp10)
