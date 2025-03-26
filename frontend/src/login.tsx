import React, { useState } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate login process (Replace with real API call)
    setTimeout(() => {
      if (formData.username === "user" && formData.password === "password") {
        onLogin(true); // Successful login
        navigate("/dashboard"); // Redirect after successful login
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login</h1>

        <div className="login-image-container">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/19b62f6e8068e7cfce2cef4139c2ad0e9384f1d2"
            alt="Login Illustration"
            className="login-image"
          />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="login-input"
                aria-label="Username"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="login-input"
                aria-label="Password"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="signup-prompt">
            <span>Don't have an account?</span>
            <span
              className="signup-link"
              onClick={handleSignUpClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSignUpClick();
              }}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
