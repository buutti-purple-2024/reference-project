import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import LeftBar from "./components/left bar/LeftBar";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import "./style.scss"

function App() {
  const currentUser = true;

  const Layout = ({ children }: { children?: ReactNode }) => {
    return (
      <div className="theme-light">
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            {children}
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
          <Route path="*" element={<Outlet />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;