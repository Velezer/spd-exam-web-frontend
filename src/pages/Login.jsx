import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>DIY Tutorial</h1>

        <InputField label="Email" type="email" placeholder="email@email.com" />
        <InputField label="Password" type="password" placeholder="********" />

        <Button text="LOGIN" onClick={() => navigate("/tutorials")} />

        <p>
          Belum punya akun?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
