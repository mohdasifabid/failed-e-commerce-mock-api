import "./MyWishlistPage.css";
import { useEffect } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import { useProductProvider } from "./productProvider";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";

export const MyWishlistPage = () => {
  const { state, dispatch } = useProductProvider();
  useEffect(async () => {
    const data = await getCall("/api/user/wishlist");
    dispatch({ type: "WISHLIST_DATA", payload: data.wishlist });
  }, []);

  const deleteItemFromWishlistHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/wishlist/${itemId}`);
    dispatch({ type: "WISHLIST_DATA", payload: data.wishlist });
  };

  const moveToCartFromWishlist = async (item) => {
    const cartData = await postCall(`/api/user/cart`, { product: item });
    dispatch({ type: "CART_DATA", payload: cartData.cart });

    const wishlistData = await deleteCall(`/api/user/wishlist/${item._id}`);
    dispatch({ type: "WISHLIST_DATA", payload: wishlistData.wishlist });
  };

  return (
    <div>
      <MyNavbar />
      <div className="my-wishlist-page-body-content">
        <h1>My Wishlist</h1>
        <div className="my-wishlist-page-body-content-cards">
          {state.wishlist.map((item) => {
            return (
              <div key={item._id} className="duck-product-card">
                <div className="duck-product-card-top">
                  <img
                    className="duck-product-card-img"
                    src={item.img}
                    alt=""
                  />
                  <div className="duck-product-card-badge duck-like-badge duck-like-badge-l">
                    <i
                      className="duck-like-badge-icon duck-like-badge-icon-l fa-solid fa-heart"
                      onClick={() => deleteItemFromWishlistHandler(item._id)}
                    ></i>
                  </div>
                </div>

                <div className="duck-product-card-middle">
                  <p className="duck-product-card-title">{item.title}</p>
                  <p className="duck-product-card-price">{item.price}</p>
                </div>
                <div className="duck-product-card-bottom">
                  <button
                    className="duck-product-card-btn duck-btn duck-btn-solid-l duck-btn-remove-from-cart"
                    onClick={() => moveToCartFromWishlist(item)}
                  >
                    Move to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
