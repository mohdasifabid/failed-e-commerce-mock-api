import { useState } from "react";
import { postCall } from "./ReusableFunctions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../features/authSlice";

export const MyLoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reduxDispatch = useDispatch()

  const saveEmailPassword = async () => {
    let data = await postCall("/api/auth/login", {
      email: email,
      password: password,
    });
    reduxDispatch(setAuthentication(true))
    localStorage.setItem("encodedToken", data.encodedToken);
    localStorage.setItem("currentUser", JSON.stringify(data.foundUser));
    navigate("/products");
  };

  const guestLoginHandler = async () => {
    let data = await postCall("/api/auth/login", {
      email: "bukart@gmail.com",
      password: "buKart123",
    });
    reduxDispatch(setAuthentication(true))
    localStorage.setItem("encodedToken", data.encodedToken);
    navigate("/products");
  };
  return (
    <div className="my-login-page-body">
      <div className="login-page">
        <p className="login-title" >LOGIN</p>
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
          className="loginBottom"
          style={{ textAlign: "center", cursor: "pointer"}}
          onClick={() => navigate("/signup")}
        >
          Not a user? <span>Create account</span>
        </a>
      </div>
    </div>
  );
};
