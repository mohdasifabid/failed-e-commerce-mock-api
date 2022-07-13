import { useState } from "react";
import { postCall } from "./ReusableFunctions";
import { useAuthProvider } from "./authProvider";
import { useNavigate } from "react-router-dom";
import { loginStatus, signupStatus } from "./authActionType";

export const MySignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch: authDispatch } = useAuthProvider();
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const saveNewUserInfo = async () => {
    const data = await postCall("/api/auth/signup", {
      firstName: name,
      lastName: "",
      email: email,
      password: password,
      confirmedPassword: confirmedPassword,
    });
    authDispatch({ type: signupStatus, payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    navigate("/login");
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
        <a
         className="loginBottom"
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Already a user? <span>Login here</span>
        </a>
      </div>
    </div>
  );
};
