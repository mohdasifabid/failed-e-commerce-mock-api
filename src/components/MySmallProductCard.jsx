import "./MySmallProductCard.css";
import { useProductProvider } from "./productProvider";

export default function MySmallProductCard({ item }) {
  const { state, dispatch } = useProductProvider();
  const { img, title, price, author, categoryName } = item;
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
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
      >
        Add to Cart
      </button>
      <button
        class="duck-card-product-btn btn-add-to-wishlist"
        onClick={() => dispatch({ type: "ADD_TO_WISHLIST", payload: item })}
      >
        Add to wishlist
      </button>
      <div class="duck-card-product-badge-like-container">
        <i class="fa-solid fa-heart duck-card-product-badge-like"></i>
      </div>
    </div>
  );
}
