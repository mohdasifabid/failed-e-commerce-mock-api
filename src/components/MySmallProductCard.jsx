import "./MySmallProductCard.css";
import { useProductProvider } from "./productProvider";
import axios from "axios";

export default function MySmallProductCard({ item }) {
  const { state, dispatch } = useProductProvider();
  const { img, title, price, author, categoryName } = item;

  const addToWishlistHandler = async (item) => {
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
      const getWishlistData = async () => {
        const token = localStorage.getItem("encodedToken");
        const response = await axios.get("/api/user/wishlist", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "WISHLIST_DATA", payload: response.data.wishlist });
        }
      };
      getWishlistData();

      // dispatch({ type: "WISHLIST_DATA", payload: response.data.wishlist });
    }
  };

  const addToCartHandler = async (item) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/user/cart`,

      { product: item },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      const getCartData = async () => {
        const token = localStorage.getItem("encodedToken");
        const response = await axios.get("/api/user/cart", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "CART_DATA", payload: response.data.cart });
        }
      };
      getCartData();
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
        onClick={() => addToCartHandler(item)}
      >
        Add to Cart
      </button>
      <button
        class="duck-card-product-btn btn-add-to-wishlist"
        onClick={() => addToWishlistHandler(item)}
      >
        Add to wishlist
      </button>
      <div class="duck-card-product-badge-like-container">
        <i
          class="fa-solid fa-heart duck-card-product-badge-like"
          onClick={() => addToWishlistHandler(item)}
        ></i>
      </div>
    </div>
  );
}
