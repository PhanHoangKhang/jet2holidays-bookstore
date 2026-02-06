# 📚 Jet2Holidays Bookstore

A modern online book store application that allows users to browse, search, and manage books with a clean UI and scalable architecture.

## 🚀 Features

🔍 Browse & search books

📖 View book details

👤 User authentication (Sign up / Login)

🛒 Cart & order management

🧑‍💼 Admin book management (CRUD)

⚡ Fast performance with modern web stack

## Tech Stack

### Frontend
<p align="left">
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind" />
</p>

- **Next.js** – React framework with SSR and Server Actions
- **React** – Component-based UI library
- **TypeScript** – Strongly typed JavaScript
- **Tailwind CSS** – Utility-first CSS framework

---

### Backend & Database
<p align="left">
  <img src="https://skillicons.dev/icons?i=mongodb,nodejs" />
</p>

- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT (JSON Web Token)** – Secure authentication & authorization

---

### Authentication & Payment

- **Google Authentication** – OAuth 2.0 login
- **JWT** – Token-based authentication
- **VietQR** – QR-based payment integration

---

## 📂 Project Structure

```bash
jet2holidays/
│
├── app/                       # Next.js App Router
│   ├── api/                   # API routes (REST / server handlers)
│   ├── auth/                  # Authentication pages (login, callback, etc.)
│   ├── books/                 # Book-related pages
│   ├── cart/                  # Shopping cart page
│   ├── favicon.ico
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
│
├── components/                # Reusable UI components
│
├── features/                  # Feature-based business logic
│   ├── auth/                  # Authentication logic (Google Auth, JWT)
│   ├── book/                  # Book domain logic
│   ├── order/                 # Order & VietQR payment logic
│   └── review/                # Book reviews
│
├── lib/                       # Shared libraries & utilities
│   └── db.ts                  # MongoDB connection
│
├── public/                    # Static assets
│
├── middleware.ts              # Next.js middleware (auth, route protection)
├── .env                       # Environment variables
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

## Set up project

### Environment Variables

Create a .env file in the root directory:
```
MONGODB_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 1. Clone the repo

```
git clone https://github.com/PhanHoangKhang/jet2holidays-bookstore.git
```

### 2. Navigate to the project folder

```
cd jet2holidays
```

### 3. Install dependencies

```
npm install
```

### 4. Run the project

```
npm run dev
```
The app will be available at:
👉 http://localhost:3000

---
