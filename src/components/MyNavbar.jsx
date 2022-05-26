import { Link, Navigate } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import { useProductProvider } from "./productProvider";
import { useNavigate } from "react-router-dom";

export const MyNavbar = () => {
  const { state, dispatch } = useProductProvider();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  let navigate = useNavigate();

  return (
    <div className="nav-container">
      <Link to="/" className="navbar-links">
        <p className="nav-brand-name">
          <strong>B</strong>u<strong>K</strong>art
        </p>
      </Link>
      <div className="nav-input-container">
        <input
          className="nav-input"
          type="text"
          placeholder="search here"
          onChange={(e) =>
            dispatch({ type: "SEARCH_BY_INPUT", payload: e.target.value })
          }
        />
      </div>
      {authState.isLogin ? (
        <div className="nav-login nav-icon-and-tag">
          <strong
            onClick={() => {
              authDispatch({ type: "LOGIN_STATUS", payload: false });
              // localStorage.removeItem("encodedToken");
              navigate("/login-page");
            }}
          >
            Logout
          </strong>
        </div>
      ) : (
        <Link to="/login-page" className="navbar-links">
          <div className="nav-login nav-icon-and-tag">
            <strong>Login</strong>
          </div>
        </Link>
      )}

      <Link to="/wishlist-page" className="navbar-links">
        <div className="duck-icon-badge">
          <i className="fa-solid fa-heart duck-icon-badge-icon"></i>
          <p className="duck-icon-badge-content nav-badge-content">
            {state.wishlist.length}
          </p>
        </div>
      </Link>
      <Link to="/cart-page" className="navbar-links">
        <div className="duck-icon-badge">
          <i className="fa-solid fa-cart-shopping duck-icon-badge-icon"></i>
          <p className="duck-icon-badge-content nav-badge-content">
            {state.cart.length}
          </p>
        </div>
      </Link>
    </div>
  );
};
