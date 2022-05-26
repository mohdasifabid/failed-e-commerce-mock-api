import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import axios from "axios";
import { useAuthProvider } from "./authProvider";

export const MySignupPage = () => {
  const { state, dispatch } = useAuthProvider();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();
  const saveNewUserInfo = async () => {
    const response = await axios.post("/api/auth/signup", {
      name: name,
      email: email,
      password: password,
      confirmedPassword: confirmedPassword,
    });

    if (response.status === 201) {
      dispatch({ type: "SIGN_UP_STATUS", payload: true });
      localStorage.setItem("encodedToken", response.data.encodedToken);
      navigate("/login-page");
    }
  };

  return (
    <div>
      <MyNavbar />
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

          {/* <button className="login-buttons" >Login With Something</button> */}

          <button className="login-buttons" onClick={saveNewUserInfo}>
            Signup
          </button>
          <Link to="/login-page">
            <p style={{ textAlign: "center", cursor: "pointer" }}>
              Already a user? <strong>Login here</strong>
            </p>
          </Link>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
