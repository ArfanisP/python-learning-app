import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  loginUser,
  registerUser,
} from "../services/authService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      await registerUser(username, email, password);
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/profile");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="card-body p-4 p-md-5">
          <span className="eyebrow">Create account</span>
          <h1 className="h2 mt-2">Register</h1>

          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              {error}
            </div>
          )}

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-control form-control-lg"
                id="username"
                placeholder="pythonista"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label" htmlFor="register-email">
                Email
              </label>
              <input
                className="form-control form-control-lg"
                id="register-email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label" htmlFor="register-password">
                Password
              </label>
              <input
                className="form-control form-control-lg"
                id="register-password"
                placeholder="Choose a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 text-start">
              <label className="form-label" htmlFor="confirm-password">
                Confirm password
              </label>
              <input
                className="form-control form-control-lg"
                id="confirm-password"
                placeholder="Repeat your password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-primary btn-lg w-100"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-secondary mt-4 mb-0">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
