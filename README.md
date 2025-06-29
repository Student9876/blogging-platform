# Blogging Platform

A full-stack blogging platform built with **Next.js** (frontend) and **Node.js/Express** (backend), using **MongoDB** for data storage. Users can register, log in, create posts, and comment on posts with their username attached.

---

## Features

- User registration and authentication (JWT-based)
- Create, edit, and delete blog posts
- Comment on posts (comments display the commenter's username)
- Responsive UI with [Tailwind CSS](https://tailwindcss.com/)
- Protected routes for authenticated actions
- Modern React (Next.js App Router)
- RESTful API with Express.js

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Student9876/codsoft.git
cd codsoft
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

The backend runs on [http://localhost:5000](http://localhost:5000).

### 3. Setup the Frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

```
codsoft/
│
├── client/      # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── contexts/
│   └── ...
│
├── server/      # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
└── README.md
```

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## License

MIT

---
