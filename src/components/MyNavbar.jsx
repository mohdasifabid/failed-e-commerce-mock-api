import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { setSearchedProducts } from "../features/filterSlice";
import { setAuthentication } from "../features/authSlice";
export const MyNavbar = () => {
  const cart = useSelector((state)=>state.cartState.cart)
  const wishlist = useSelector((state)=>state.wishlistState.wishlist)
  const isAuthenticated = useSelector(state=>state.authState.isAuthenticated)
  const reduxDispatch = useDispatch()
  const searchQuery = useSelector(state=> state.filteredState.searchQuery)
  let navigate = useNavigate();
  
  return (
    <div className="ec-nav-container">
      <a className="ec-brand-name" onClick={() => navigate("/")}>
        <strong>B</strong>u<strong>K</strong>art
      </a>
      <input
        value={searchQuery}
        className="ec-nav-input"
        type="text"
        placeholder="search here"
        onChange={(e) => {
          reduxDispatch(setSearchedProducts(e.target.value))
          e.target.value.length > 0 && navigate("/products");
        }}
      />
      <div className="ec-nav-rightside-items">
      <a  className="duck-icon-badge ec-cart ec-nav-products-link" onClick={()=>navigate("/products")}>Products</a>

      <a className="duck-icon-badge" onClick={() => navigate("/wishlist")}>
        <i className="fa-solid fa-heart  navbar-icons"></i>
        <p className="duck-icon-badge-content navbar-badge-content">
          {wishlist.length}
        </p>
      </a>
      <a className="duck-icon-badge ec-cart" onClick={() => navigate("/cart")}>
        <i className="fa-solid fa-cart-shopping  navbar-icons"></i>
        <p className="duck-icon-badge-content navbar-badge-content">
          {cart.length}
        </p>
      </a>

      {isAuthenticated ? (
        <a
          className="duck-icon-badge ec-cart"
          onClick={() => {
            reduxDispatch(setAuthentication(false));
            localStorage.removeItem("encodedToken");
            navigate("/login");
          }}
        > Logout
        </a>
      ) : (
        <a
          className="duck-icon-badge ec-cart"
          onClick={() => navigate("/login")}
        >Login</a>
      )}
      </div>
    </div>
  );
};
