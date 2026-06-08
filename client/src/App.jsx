import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";

const navLinkClass = ({ isActive }) =>
  `nav-link${isActive ? " active" : ""}`;

function AppContent() {
  useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold" to="/">
            Python Learning
          </NavLink>

          <div className="navbar-nav flex-row gap-2 ms-auto">
            <NavLink className={navLinkClass} to="/lessons">
              Lessons
            </NavLink>
            <NavLink className={navLinkClass} to="/profile">
              Profile
            </NavLink>
            {!isLoggedIn && (
              <>
              <NavLink className="btn btn-sm btn-outline-primary" to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-sm btn-primary" to="/register">
                Register
              </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/quiz/:lessonId" element={<Quiz />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
