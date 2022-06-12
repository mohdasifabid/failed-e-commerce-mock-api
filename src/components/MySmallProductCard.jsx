import "./MySmallProductCard.css";
import { deleteCall, postCall } from "./ReusableFunctions";
import { useProductProvider } from "./productProvider";
import { useState } from "react";
import { useAuthProvider } from "./authProvider";
import { useNavigate } from "react-router-dom";

export default function MySmallProductCard({ item }) {
  const { state, dispatch } = useProductProvider();
  const { state: authState } = useAuthProvider();
  const navigate = useNavigate();
  const { img, title, price, author, categoryName } = item;
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartButtonContent, setCartButtonContent] = useState("Add to Cart");

  const addToWishlistHandler = async (item) => {
    const data = await postCall("/api/user/wishlist", { product: item });
    dispatch({ type: "WISHLIST_DATA", payload: data.wishlist });
  };
  const deleteFromWishlistHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/wishlist/${itemId}`);
    dispatch({ type: "WISHLIST_DATA", payload: data.wishlist });
  };
  const addToCartHandler = async (item) => {
    const data = await postCall("/api/user/cart", { product: item });
    dispatch({ type: "CART_DATA", payload: data.cart });
  };

  const deleteFromCartHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/cart/${itemId}`);
    dispatch({ type: "CART_DATA", payload: data.cart });
  };
  const inCart = state.cart.some((prod) => prod._id === item._id);
  return (
    <div className="duck-card-product-container">
      <img className="duck-card-product-img" src={img} alt="" />
      <p className="duck-card-product-title">{title}</p>
      <p className="duck-card-product-by">{author}</p>
      <p className="duck-card-product-info">{categoryName}</p>
      <p className="duck-card-product-price">
        <small>INR</small> <strong>{price}</strong>
      </p>
      <button
        className="duck-card-product-btn btn-add-to-cart"
        onClick={() => {
          if (!authState.isLogin) {
            return navigate("/login-page");
          }
          if (!inCart) {
            addToCartHandler(item) && setCartButtonContent("Remove from Cart");
          }
          if (inCart) {
            return (
              deleteFromCartHandler(item._id) &&
              setCartButtonContent("Add to Cart")
            );
          }
        }}
      >
        {cartButtonContent}
      </button>

      {isInWishlist ? (
        <button
          className="duck-card-product-btn btn-add-to-wishlist"
          onClick={() => {
            deleteFromWishlistHandler(item._id);
            setIsInWishlist(false);
          }}
        >
          Remove from wishlist
        </button>
      ) : (
        <button
          className="duck-card-product-btn btn-add-to-wishlist"
          onClick={() => {
            addToWishlistHandler(item);
            setIsInWishlist(true);
          }}
        >
          Add to wishlist
        </button>
      )}
      <div className="duck-card-product-badge-like-container">
        {isInWishlist ? (
          <i
            style={{ color: "gray" }}
            className="fa-solid fa-heart duck-card-product-badge-like"
            onClick={() => {
              deleteFromWishlistHandler(item._id);
              setIsInWishlist(false);
            }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-heart duck-card-product-badge-like"
            onClick={() => {
              addToWishlistHandler(item);
              setIsInWishlist(true);
            }}
          ></i>
        )}
      </div>
    </div>
  );
}
