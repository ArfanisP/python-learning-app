import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      navigate("/profile");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="card-body p-4 p-md-5">
          <span className="eyebrow">Welcome back</span>
          <h1 className="h2 mt-2">Login</h1>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control form-control-lg"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 text-start">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control form-control-lg"
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary btn-lg w-100" type="submit">
              Login
            </button>
          </form>

          <p className="text-secondary mt-4 mb-0">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
