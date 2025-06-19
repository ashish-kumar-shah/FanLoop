# 🤖 Fanloop - A Lightweight Celebrity-Fan Social Platform

**fanloop** is a modern, lightweight social platform built using the MERN stack. It allows public users to create accounts, follow pre-defined celebrity (dummy) accounts, and view or interact with their posts.

---

## 🌐 Live Preview

> _[Add your deployed link here]_

---

## 📁 Project Structure

```
lax/
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── public/
│   ├── index.html
│   ├── logo.png
│   └── ...
├── src/
│   ├── App.js
│   ├── index.js
│   ├── Context/
│   ├── Hooks/
│   ├── Pages/
│   ├── API/
│   ├── Component/
│   └── ...
└── README.md
```

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Context API
- React Router
- Axios

### Backend
> *(Handled separately – assumed to be Express.js with MongoDB)*

---

## 🚀 Features

- 🔐 Login/Register functionality
- 📸 Create & upload posts (image/video)
- 👤 Dummy celebrity accounts
- ✅ Public users can follow and view celebrity posts
- 🏠 Feed Page with post listing
- ⏳ Upload progress indicator
- 📱 Fully responsive mobile layout

---

## 🧪 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/lax.git
cd lax
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
REACT_APP_USER_URL=http://localhost:5000/api/auth/user
REACT_APP_POST_URL=http://localhost:5000/api/userpost
REACT_APP_SERVICE_URL=http://localhost:5000/api/user
```

### 4. Run the frontend

```bash
npm start
```

Make sure your backend is running on port `5000`.

---

## 🧩 Core Folders

### `src/Context/`
- AppContext.js, UserContext.js, PostContext.js – global state logic

### `src/API/`
- Axios files for API calls – `UserApi.js`, `PostApi.js`, `ServiceApi.js`

### `src/Component/`
- Components like `SideBar`, `Navbar`, `UploadFiles`, `FollowButton`

### `src/Pages/`
- Auth & user pages: `Login`, `Register`, `Feed`, `Profile`, `Home`, etc.

### `src/Hooks/`
- `useSocket.js`: manages real-time socket interaction

---

## 📄 Scripts

```bash
npm start       # Starts frontend dev server
npm run build   # Builds production version
npm test        # Runs tests (if added)
```

---

## 🙌 Author

Ashish Kumar shah


---

## 📜 License

MIT License

