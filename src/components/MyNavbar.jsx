import { Link, useNavigate } from "react-router-dom";
import { loginStatus } from "./authActionType";
import { useAuthProvider } from "./authProvider";
import { searchByInput } from "./productActionType";
import { useProductProvider } from "./productProvider";

export const MyNavbar = () => {
  const { state, dispatch } = useProductProvider();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="ec-nav-container">
      <a className="ec-brand-name" onClick={() => navigate("/")}>
        <strong>B</strong>u<strong>K</strong>art
      </a>
      <input
        value={state.inputSearch}
        className="ec-nav-input"
        type="text"
        placeholder="search here"
        onChange={(e) => {
          dispatch({ type: searchByInput, payload: e.target.value });
          e.target.value.length > 0 && navigate("/products");
        }}
      />

      <a className="duck-icon-badge" onClick={() => navigate("/wishlist")}>
        <i className="fa-solid fa-heart  navbar-icons"></i>
        <p className="duck-icon-badge-content navbar-badge-content">
          {state.wishlist.length}
        </p>
      </a>
      <a className="duck-icon-badge ec-cart" onClick={() => navigate("/cart")}>
        <i className="fa-solid fa-cart-shopping  navbar-icons"></i>
        <p className="duck-icon-badge-content navbar-badge-content">
          {state.cart.length}
        </p>
      </a>

      {authState.isLogin ? (
        <div
          className="ec-nav-login "
          onClick={() => {
            authDispatch({ type: loginStatus, payload: false });
            localStorage.removeItem("encodedToken");
            navigate("/login");
          }}
        >
          <i className="fa-solid fa-user"></i>
          <span> {currentUser.firstName + " " + currentUser.lastName} </span>
        </div>
      ) : (
        <i
          className="fa-regular fa-user ec-nav-login"
          onClick={() => navigate("/login")}
        ></i>
      )}
    </div>
  );
};
