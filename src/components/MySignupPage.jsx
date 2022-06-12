import { useState } from "react";
import { postCall } from "./ReusableFunctions";
import { useAuthProvider } from "./authProvider";
import { useNavigate } from "react-router-dom";

export const MySignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch: authDispatch } = useAuthProvider();
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const saveNewUserInfo = async () => {
    const data = await postCall("/api/auth/signup", {
      name: name,
      email: email,
      password: password,
      confirmedPassword: confirmedPassword,
    });
    authDispatch({ type: "SIGN_UP_STATUS", payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    navigate("/login-page");
  };

  return (
    <div className="my-login-page-body">
      <div className="login-page">
        <p className="login-title">Create new account</p>
        <input
          type="text"
          className="login-email-input login-inputs"
          placeholder="Enter your name here"
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          className="login-password login-inputs"
          placeholder="Confirm your password here"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        <button className="login-buttons" onClick={saveNewUserInfo}>
          Signup
        </button>
        <p
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/login-page")}
        >
          Already a user? <span>Login here</span>
        </p>
      </div>
    </div>
  );
};
