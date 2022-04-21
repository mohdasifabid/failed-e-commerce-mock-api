import "./MySmallProductCard.css";
import { useProductProvider } from "./productProvider";
import axios from "axios";

export default function MySmallProductCard({ item }) {
  const { state, dispatch } = useProductProvider();
  const { img, title, price, author, categoryName } = item;

  const addToWishlistHandler = async () => {
    const token = localStorage.getItem("encodedToken");

    const response = await axios.post(
      "/api/user/wishlist",
      {
        product: item,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      dispatch({ type: "WISHLIST_DATA", payload: response.data.wishlist });
    }
  };

  const addToCartHandler = async () => {
    const token = localStorage.getItem("encodedToken");

    const response = await axios.post(
      "/api/user/cart",
      {
        product: item,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_CART", payload: response.data.cart });
    }
  };

  return (
    <div class="duck-card-product-container">
      <img class="duck-card-product-img" src={img} alt="" />
      <p class="duck-card-product-title">{title}</p>
      <p class="duck-card-product-by">{author}</p>
      <p class="duck-card-product-info">{categoryName}</p>
      <p class="duck-card-product-price">
        <small>INR</small> <strong>{price}</strong>
      </p>
      <button
        class="duck-card-product-btn btn-add-to-cart"
        onClick={addToCartHandler}
      >
        Add to Cart
      </button>
      <button
        class="duck-card-product-btn btn-add-to-wishlist"
        onClick={addToWishlistHandler}
      >
        Add to wishlist
      </button>
      <div class="duck-card-product-badge-like-container">
        <i
          class="fa-solid fa-heart duck-card-product-badge-like"
          onClick={addToWishlistHandler}
        ></i>
      </div>
    </div>
  );
}
