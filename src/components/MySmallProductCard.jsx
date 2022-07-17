import "./MySmallProductCard.css";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import { deleteCall, postCall } from "./ReusableFunctions";
import { useDispatch} from "react-redux"
import { setCartData } from "../features/cartSlice";
import { setWishlist } from "../features/wishlistSlice";
import { useSelector} from "react-redux"


export default function MySmallProductCard({ item }) {
  const { state: authState } = useAuthProvider();
  const navigate = useNavigate();
  const { img, title, price, author, categoryName } = item;
  const reduxDispatch = useDispatch()
  const cart = useSelector((state)=>state.cartState.cart)
  const wishlist = useSelector((state)=>state.wishlistState.wishlist)
  const addToWishlistHandler = async (item) => {
    const data = await postCall("/api/user/wishlist", { product: item });
    reduxDispatch(setWishlist(data.wishlist))
  };
  const deleteFromWishlistHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/wishlist/${itemId}`);
    reduxDispatch(setCartData( data.cart))

  };
  const addToCartHandler = async (item) => {
    const data = await postCall("/api/user/cart", { product: item });
    reduxDispatch(setCartData( data.cart))
  };

  const deleteFromCartHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/cart/${itemId}`);
    reduxDispatch(setCartData(data.cart))
  };
  const inCart = cart.some((prod) => prod._id === item._id);

  const inWishlist = wishlist.some((prod) => prod._id === item._id);

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
            authState.isLogin && 
              navigate("/login");
          }}
        >
          Remove from Wishlist
        </button>
      ) : (
        <button
          className="duck-card-product-btn btn-add-to-wishlist"
          onClick={() => {
            authState.isLogin
              ? addToWishlistHandler(item): navigate("/login");
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
