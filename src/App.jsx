import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";

import TutorialList from "./pages/TutorialList"
import TutorialDetail from "./pages/TutorialDetail"
import Register from "./pages/Register"
import Login from "./pages/Login"

/* Placeholder Profile Component */
function Profile({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

/* =========================
   Layout Component
========================= */
function Layout({ user, onLogout, children }) {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Link to="/">DIY Tutorial</Link>
        </div>

        <nav className="nav">
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        © 2026 DIY Tutorial. All rights reserved.
      </footer>
    </div>
  );
}

/* =========================
   Main App
========================= */

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<TutorialList />} />
          <Route path="/tutorial/:id" element={<TutorialDetail />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
