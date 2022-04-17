import { Link } from "react-router-dom";
import { useProductProvider } from "./productProvider";

export const MyNavbar = () => {
  const { state, dispatch } = useProductProvider();

  return (
    <div class="nav-container">
      <Link to="/" className="navbar-links">
        <p class="nav-brand-name">
          <strong>B</strong>u<strong>K</strong>art
        </p>
      </Link>
      <div class="nav-input-container">
        <input
          class="nav-input"
          type="text"
          placeholder="search here"
          onChange={(e) =>
            dispatch({ type: "SEARCH_BY_INPUT", payload: e.target.value })
          }
        />
      </div>
      <Link to="/login-page" className="navbar-links">
        <div class="nav-login nav-icon-and-tag">
          <strong>Login</strong>
        </div>
      </Link>

      <Link to="/wishlist-page" className="navbar-links">
        <div class="duck-icon-badge">
          <i class="fa-solid fa-heart duck-icon-badge-icon"></i>
          <p class="duck-icon-badge-content nav-badge-content">
            {state.itemsInWishlist.length}
          </p>
        </div>
      </Link>
      <Link to="/cart-page" className="navbar-links">
        <div class="duck-icon-badge">
          <i class="fa-solid fa-cart-shopping duck-icon-badge-icon"></i>
          <p class="duck-icon-badge-content nav-badge-content">
            {state.itemsInCart.length}
          </p>
        </div>
      </Link>
    </div>
  );
};
