import { useEffect } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import "./MyWishlistPage.css";
import { useProductProvider } from "./productProvider";
import axios from "axios";

export const MyWishlistPage = () => {
  const { state, dispatch } = useProductProvider();
  useEffect(() => {
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
  }, []);

  const deleteItemFromWishlistHandler = async (itemId) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.delete(`/api/user/wishlist/${itemId}`, {
      headers: {
        authorization: token,
      },
      data: itemId,
    });
    return response;
  };
  const moveToCartFromWishlist = async (item) => {
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
    deleteItemFromWishlistHandler(item._id);

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
