# 🌀 FanLoop — A Full-Stack Social Media App

FanLoop is a full-stack social media web application built with **React.js**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It enables users to register, upload posts (image/video), follow others, and receive real-time notifications.

## 🚀 Live Demo

🔗 [https://fanloop.onrender.com](https://fanloop.onrender.com)

---

## 📁 Folder Structure

```
FanLoop/
├── README.md
├── render.yaml
├── Server/
│   ├── .env
│   ├── Index.js                 # Express server entry point
│   ├── Socket.js                # Socket.IO real-time handling
│   ├── package.json
│   ├── Auth/                    # Validation & username logic
│   ├── Config/                  # Database connection
│   ├── Controller/              # Business logic (CRUD)
│   ├── Middleware/              # File upload middleware
│   ├── Models/                  # Mongoose models
│   ├── Routes/                  # API endpoints
│   ├── Utils/                   # Utility files
│   ├── temp/                    # Temporary file storage
│   └── client/                  # React frontend app
│       ├── build/              # Production-ready build
│       ├── public/             # Static assets
│       └── src/
│           ├── Pages/          # Route-level components
│           ├── Component/      # Reusable UI components
│           ├── Context/        # Global state (React Context API)
│           ├── API/            # Axios API calls
│           ├── Hooks/          # Custom hooks (e.g. socket)
│           ├── Reducer/        # Reducer logic
│           └── Utils/          # Frontend helpers
```

---

## 🛠️ Tech Stack

### 🔹 Frontend

- React.js
- Tailwind CSS
- Axios
- React Router
- Context API

### 🔸 Backend

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer (File Uploads)
- Cloudinary (Media Storage)
- Socket.IO (Real-time Notifications)

---

## 🔐 Features

- ✅ User Registration & Login
- 🖼️ Post Image/Video Uploads
- 🧑‍🤝‍🧑 Follow/Unfollow Users
- 🔔 Real-time Notifications via WebSocket
- 🔍 Search Users
- 🧾 Profile Management
- 🛡️ Protected Routes (Auth Middleware)
- 📦 RESTful APIs

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fanloop.git
cd fanloop/Server

# Install server dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

---

## 🧪 Development

```bash
# From the /Server directory:
npm run build        # Builds the React frontend
npm start            # Starts the backend and serves frontend build
```

---

## 🌐 Environment Variables

In the `Server/.env` file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📤 Deployment (Render)

- Uses `render.yaml` for deployment configuration.
- Single service (Node server + React build).
- Socket.IO works over the same server using `http`.

---

## 🤝 Author

**Ashish Kumar Shah**



---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
