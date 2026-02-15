import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import AuthClient from "../api/AuthClient";
import { notify } from "../utils/notify";
import "../styles/auth.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error) => {
    if (!error.response) {
      return "Tidak bisa terhubung ke server. Periksa koneksi Anda.";
    }

    const status = error.response.status;
    const data = error.response.data;

    // 4xx Client Errors
    if (status === 400) {
      return "Email atau password tidak valid.";
    }
    if (status === 401) {
      return "Email atau password salah. Coba lagi.";
    }
    if (status === 404) {
      return "Akun tidak ditemukan. Daftar terlebih dahulu.";
    }

    // 5xx Server Errors
    if (status >= 500) {
      return "Server sedang mengalami gangguan. Coba lagi nanti.";
    }

    return data.error || "Login gagal. Coba lagi.";
  };

  const handleLogin = async () => {
    if (!email || !password) {
      notify("Email dan password harus diisi", "error");
      return;
    }

    if (!email.includes("@")) {
      notify("Email tidak valid", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await AuthClient.login({ email, password });
      const { token, user } = response.data;

      // Store user data with token
      const userData = { ...user, token };
      onLogin(userData);

      notify("Login berhasil!", "success");
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
        <h1>DIY Tutorial</h1>

        <InputField
          label="Email"
          type="email"
          placeholder="email@email.com"
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
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
