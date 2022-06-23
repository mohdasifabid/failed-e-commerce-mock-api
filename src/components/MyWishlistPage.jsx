import "./MyWishlistPage.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { cartData, wishlistData } from "./productActionType";
import { useProductProvider } from "./productProvider";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";

export const MyWishlistPage = () => {
  const { state, dispatch } = useProductProvider();
  useEffect(async () => {
    const data = await getCall("/api/user/wishlist");
    dispatch({ type: wishlistData, payload: data.wishlist });
  }, []);

  const deleteItemFromWishlistHandler = async (itemId) => {
    const data = await deleteCall(`/api/user/wishlist/${itemId}`);
    dispatch({ type: wishlistData, payload: data.wishlist });
  };

  const moveToCartFromWishlist = async (item) => {
    const cartResponse = await postCall(`/api/user/cart`, { product: item });
    dispatch({ type: cartData, payload: cartResponse.cart });

    const wishlistResponse = await deleteCall(`/api/user/wishlist/${item._id}`);
    dispatch({ type: wishlistData, payload: wishlistResponse.wishlist });
  };

  return (
    <Layout>
      <div className="ec-wishlist-container">
        <h1>My Wishlist</h1>
        <div className="ec-wishlist-cards-container">
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
                      className="ec-wishlist-card-like-icon duck-like-badge-icon fa-solid fa-heart"
                      onClick={() => deleteItemFromWishlistHandler(item._id)}
                    ></i>
                  </div>
                </div>

                <div className="duck-product-card-middle">
                  <p className="duck-product-card-title">{item.title}</p>
                  <p className="duck-product-card-price">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {item.price}
                  </p>
                </div>
                <div className="duck-product-card-bottom">
                  <button
                    className="duck-card-product-btn btn-add-to-wishlist"
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
    </Layout>
  );
};
