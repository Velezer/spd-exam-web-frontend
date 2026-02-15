import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import AuthClient from "../api/AuthClient";
import { notify } from "../utils/notify";
import logo from "../assets/logo.png";
import "../styles/auth.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error) => {
    if (!error.response) {
      return "something wrong";
    }

    const status = error.response.status;
    const data = error.response.data;

    // 4xx Client Errors
    if (status === 400) {
      return "bad request";
    }
    if (status === 401) {
      return "unauthorized";
    }
    if (status === 404) {
      return "not found";
    }

    // 5xx Server Errors
    if (status >= 500) {
      return "internal server error";
    }

    return data.error || "login failed";
  };

  const handleLogin = async () => {
    if (!email || !password) {
      notify("email & password required", "error");
      return;
    }

    if (!email.includes("@")) {
      notify("email not valid", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await AuthClient.login({ email, password });
      const { token, user } = response.data;

      // Store user data with token
      const userData = { ...user, token };
      onLogin(userData);

      notify("login success!", "success");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h1>DIY Tutorial</h1>

        <InputField
          label="Email"
          type="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text={loading ? "LOADING..." : "LOGIN"}
          onClick={handleLogin}
          disabled={loading}
        />

        <p>
          Belum punya akun?{" "}
          <span>
            <Button
              text={"REGISTER"}
              onClick={() => navigate("/register")}
            />
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
