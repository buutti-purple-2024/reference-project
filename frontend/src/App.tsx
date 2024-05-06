import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import LeftBar from "./components/left bar/LeftBar";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Friends from "./pages/friends/Friends";
import Chat from "./pages/chat/Chat";
import axios from "axios";

import "./style.scss"

function App() {
  //const currentUser = true;
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  useEffect(() => {
    // Function to fetch user data
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user'); // Replace '/api/user' with your actual endpoint
        setCurrentUser(response.data); // Set the current user state with the fetched user data
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser(); // Call the fetchUser function when the component mounts
  }, []);

  const Layout = ({ children }: { children?: ReactNode }) => {
    return (
      <div className="theme-light">
       <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
            { children}
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    if (!currentUser) {
      navigate("/login");
      return null;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="*" element={<Outlet />} />
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/chat" element={<Chat />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
