import { Link, Navigate } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import { useProductProvider } from "./productProvider";
import { useNavigate } from "react-router-dom";

export const MyNavbar = () => {
  const { state, dispatch } = useProductProvider();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  let navigate = useNavigate();

  return (
    <div className="ec-nav-container">
      <Link to="/" className="ec-nav-links">
        <p className="ec-brand-name">
          <strong>B</strong>u<strong>K</strong>art
        </p>
      </Link>
      <input
        className="ec-nav-input"
        type="text"
        placeholder="search here"
        onChange={(e) =>
          dispatch({ type: "SEARCH_BY_INPUT", payload: e.target.value })
        }
      />

      <Link to="/wishlist-page" className="ec-nav-links">
        <div className="duck-icon-badge">
          <i className="fa-solid fa-heart  navbar-icons"></i>
          <p className="duck-icon-badge-content navbar-badge-content">
            {state.wishlist.length}
          </p>
        </div>
      </Link>
      <Link to="/cart-page" className="ec-nav-links">
        <div className="duck-icon-badge ec-cart">
          <i className="fa-solid fa-cart-shopping  navbar-icons"></i>
          <p className="duck-icon-badge-content navbar-badge-content">
            {state.cart.length}
          </p>
        </div>
      </Link>

      {authState.isLogin ? (
        <div className="ec-nav-login ">
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
        <Link to="/login-page" className="ec-nav-links">
          <div className="ec-nav-login ">
            <strong>Login</strong>
          </div>
        </Link>
      )}
    </div>
  );
};
