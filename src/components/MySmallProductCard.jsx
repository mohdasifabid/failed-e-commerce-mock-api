import "./MySmallProductCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import { useProductProvider } from "./productProvider";
import { deleteCall, postCall } from "./ReusableFunctions";
import { CART_DATA, WISHLIST_DATA } from "./productActionType";
import { useDispatch} from "react-redux"
import { setCartData } from "../features/cartSlice";

export default function MySmallProductCard({ item }) {
  const { state, dispatch } = useProductProvider();
  const { state: authState } = useAuthProvider();
  const navigate = useNavigate();
  const { img, title, price, author, categoryName } = item;
  const [wishlistIconColor, setWishlistIconColor] = useState({});
  const cartDispatch = useDispatch()

  const addToWishlistHandler = async (item) => {
    const data = await postCall("/api/user/wishlist", { product: item });
    dispatch({ type: WISHLIST_DATA, payload: data.wishlist });
  };
  const deleteFromWishlistHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/wishlist/${itemId}`);
    dispatch({ type: WISHLIST_DATA, payload: data.wishlist });
  };
  const addToCartHandler = async (item) => {
    const data = await postCall("/api/user/cart", { product: item });
    dispatch({ type: CART_DATA, payload: data.cart });
    cartDispatch(setCartData( data.cart))
  };

  const deleteFromCartHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/cart/${itemId}`);
    dispatch({ type: CART_DATA, payload: data.cart });
  };
  const inCart = state.cart.some((prod) => prod._id === item._id);

  const inWishlist = state.wishlist.some((prod) => prod._id === item._id);

  return (
    <div className="duck-card-product-container">
      <img className="duck-card-product-img" src={img} alt="" />
      <p className="duck-card-product-title">{title}</p>
      <p className="duck-card-product-by">{author}</p>
      <p className="duck-card-product-info">{categoryName}</p>
      <p className="duck-card-product-price">
        <small>INR</small> <strong>{price}</strong>
      </p>
      {inCart ? (
        <button
          className="duck-card-product-btn btn-add-to-cart"
          onClick={() =>
            authState.isLogin
              ? deleteFromCartHandler(item._id)
              : navigate("/login")
          }
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="duck-card-product-btn btn-add-to-cart"
          onClick={() =>
            authState.isLogin ? addToCartHandler(item) : navigate("/login")
          }
        >
          Add to Cart
        </button>
      )}
      {inWishlist ? (
        <button
          className="duck-card-product-btn btn-add-to-wishlist"
          onClick={() => {
            authState.isLogin
              ? (deleteFromWishlistHandler(item._id),
                setWishlistIconColor("rgb(229,231,235)"))
              : navigate("/login");
          }}
        >
          Remove from Wishlist
        </button>
      ) : (
        <button
          className="duck-card-product-btn btn-add-to-wishlist"
          onClick={() => {
            authState.isLogin
              ? (addToWishlistHandler(item), setWishlistIconColor("gray"))
              : navigate("/login");
          }}
        >
          Add to Wishlist
        </button>
      )}

      {inWishlist ? (
        <a
          className="duck-card-product-badge-like-container"
          onClick={() => {
            authState.isLogin
              ? deleteFromWishlistHandler(item._id)
              : navigate("/login");
          }}
        >
          <i
            style={{ color: "gray" }}
            className="fa-solid fa-heart duck-card-product-badge-like"
          ></i>
        </a>
      ) : (
        <a
          className="duck-card-product-badge-like-container"
          onClick={() => {
            authState.isLogin ? addToWishlistHandler(item) : navigate("/login");
          }}
        >
          <i
            style={{ color: "rgb(229,231,235)" }}
            className="fa-solid fa-heart duck-card-product-badge-like"
          ></i>
        </a>
      )}
    </div>
  );
}
