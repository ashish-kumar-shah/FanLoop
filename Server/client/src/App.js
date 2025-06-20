import "./App.css";
import UserContext from "./Context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Profile from "./Pages/Profile";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import CreatePost from "./Pages/CreatePost";
import Feed from "./Pages/Feed";
import Notification from "./Pages/Notification";
import Setting from "./Pages/Setting";

import UserPostContext from "./Context/UserPostContext";
import ServicesApi from "./Context/ServicesApi";
import ViewPost from "./Pages/ViewPost";


function App() {
  return (
    <Router>
      <UserContext>
        <UserPostContext>
          <ServicesApi>
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              {/* Protected routes under Main layout */}
              <Route
                element={
                  <ProtectedRoute>
                    <Main />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/notifications" element={<Notification />} />
                <Route path="/settings" element={<Setting />} />
                <Route path="/viewpost/:id" element={<ViewPost />} />

               
              </Route>
            </Routes>
            
          </ServicesApi>
        </UserPostContext>
      </UserContext>
    </Router>
  );
}

export default App;
