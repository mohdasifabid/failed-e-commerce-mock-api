import { useState } from "react";
import { postCall } from "./ReusableFunctions";
import { useAuthProvider } from "./authProvider";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "./authActionType";

export const MyLoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch: authDispatch } = useAuthProvider();

  const saveEmailPassword = async () => {
    let data = await postCall("/api/auth/login", {
      email: email,
      password: password,
    });
    authDispatch({ type: loginStatus, payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    localStorage.setItem("currentUser", JSON.stringify(data.foundUser));
    navigate("/products");
  };

  const guestLoginHandler = async () => {
    let data = await postCall("/api/auth/login", {
      email: "bukart@gmail.com",
      password: "buKart123",
    });
    authDispatch({ type: loginStatus, payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    localStorage.setItem("currentUser", JSON.stringify(data.foundUser));
    navigate("/products");
  };
  return (
    <div className="my-login-page-body">
      <div className="login-page">
        <p className="login-title">LOGIN</p>
        <input
          type="email"
          className="login-email-input login-inputs"
          placeholder="Enter your email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-password login-inputs"
          placeholder="Enter your password here"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-buttons" onClick={saveEmailPassword}>
          LOGIN
        </button>
        <button className="login-buttons" onClick={guestLoginHandler}>
          LOGIN AS GUEST
        </button>
        <a
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Not a user? <span>Create account</span>
        </a>
      </div>
    </div>
  );
};
