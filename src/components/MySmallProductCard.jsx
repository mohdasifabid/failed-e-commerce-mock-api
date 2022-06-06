import "./MySmallProductCard.css";
import { postCall } from "./ReusableFunctions";
import { useProductProvider } from "./productProvider";

export default function MySmallProductCard({ item }) {
  const { dispatch } = useProductProvider();
  const { img, title, price, author, categoryName } = item;

  const addToWishlistHandler = async (item) => {
    const data = await postCall("/api/user/wishlist", { product: item });
    dispatch({ type: "WISHLIST_DATA", payload: data.wishlist });
  };

  const addToCartHandler = async (item) => {
    const data = await postCall("/api/user/cart", { product: item });
    dispatch({ type: "CART_DATA", payload: data.cart });
  };

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
        onClick={() => addToCartHandler(item)}
      >
        Add to Cart
      </button>
      <button
        className="duck-card-product-btn btn-add-to-wishlist"
        onClick={() => addToWishlistHandler(item)}
      >
        Add to wishlist
      </button>
      <div className="duck-card-product-badge-like-container">
        <i
          className="fa-solid fa-heart duck-card-product-badge-like"
          onClick={() => addToWishlistHandler(item)}
        ></i>
      </div>
    </div>
  );
}
