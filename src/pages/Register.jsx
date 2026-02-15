import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import AuthClient from "../api/AuthClient";
import { notify } from "../utils/notify";
import logo from "../assets/logo.png";
import "../styles/auth.css";

function Register({ onRegister }) {
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
      return data.error || "Data yang Anda kirim tidak valid. Periksa kembali.";
    }
    if (status === 409) {
      return "Email sudah terdaftar. Gunakan email lain atau login.";
    }

    // 5xx Server Errors
    if (status >= 500) {
      return "Server sedang mengalami gangguan. Coba lagi nanti.";
    }

    return data.error || "Registrasi gagal. Coba lagi.";
  };

  const handleRegister = async () => {
    if (!email || !password) {
      notify("Semua field harus diisi", "error");
      return;
    }

    if (!email.includes("@")) {
      notify("Email tidak valid", "error");
      return;
    }

    if (password.length < 6) {
      notify("Password minimal 6 karakter", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await AuthClient.register({ email, password });
      const { token, user } = response.data;

      // Store user data with token
      const userData = { ...user, token };
      onRegister(userData);

      notify("Registrasi berhasil!", "success");
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
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
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text={loading ? "LOADING..." : "REGISTER"}
          onClick={handleRegister}
          disabled={loading}
        />

        <p>
          Sudah punya akun?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
