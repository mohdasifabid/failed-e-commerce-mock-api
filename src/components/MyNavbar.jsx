import { Link, useNavigate } from "react-router-dom";
import { loginStatus } from "./authActionType";
import { useAuthProvider } from "./authProvider";
import { searchByInput } from "./productActionType";
import { useProductProvider } from "./productProvider";

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
        value={state.inputSearch}
        className="ec-nav-input"
        type="text"
        placeholder="search here"
        onChange={(e) => {
          dispatch({ type: searchByInput, payload: e.target.value });
          e.target.value.length > 0 && navigate("/product");
        }}
      />

      <Link to="/wishlist" className="ec-nav-links">
        <div className="duck-icon-badge">
          <i className="fa-solid fa-heart  navbar-icons"></i>
          <p className="duck-icon-badge-content navbar-badge-content">
            {state.wishlist.length}
          </p>
        </div>
      </Link>
      <Link to="/cart" className="ec-nav-links">
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
              authDispatch({ type: loginStatus, payload: false });
              localStorage.removeItem("encodedToken");
              navigate("/login");
            }}
          >
            Logout
          </strong>
        </div>
      ) : (
        <Link to="/login" className="ec-nav-links">
          <div className="ec-nav-login ">
            <strong>Login</strong>
          </div>
        </Link>
      )}
    </div>
  );
};
