import axios from "axios";
import { useState } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import { useNavigate, Link } from "react-router-dom";
import { useAuthProvider } from "./authProvider";

export const MyLoginPage = () => {
  const { state, dispatch } = useAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const saveEmailPassword = async () => {
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      dispatch({ type: "LOGIN_STATUS", payload: true });
      localStorage.setItem("encodedToken", response.data.encodedToken);
      navigate("/product-page");
    }
  };

  return (
    <div>
      <MyNavbar />
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
          {/* <button className="login-buttons" >Login With Something</button> */}

          <button className="login-buttons" onClick={saveEmailPassword}>
            LOGIN
          </button>
          <Link to="/signup-page">
            <p style={{ textAlign: "center", cursor: "pointer" }}>
              Not a user? <strong>create account</strong>
            </p>
          </Link>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
