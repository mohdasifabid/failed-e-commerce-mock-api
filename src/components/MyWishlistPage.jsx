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
    const response = await axios.delete("/api/user/wishlist/:productId", {
      headers: {
        authorization: token,
      },
      data: itemId,
    });

    console.log("delete api integration", response);
  };

  return (
    <div>
      <MyNavbar />
      <div className="my-wishlist-page-body-content">
        <h1>My Wishlist</h1>
        <div className="my-wishlist-page-body-content-cards">
          {state.wishlist.map((item) => {
            return (
              <div key={item._id} class="duck-product-card">
                <div class="duck-product-card-top">
                  <img class="duck-product-card-img" src={item.img} alt="" />
                  <div class="duck-product-card-badge duck-like-badge duck-like-badge-l">
                    {/* onClicking this heart icon it deleting all item's 
                    from the wishlist instead of the particular item, we want to delete */}
                    <i
                      class="duck-like-badge-icon duck-like-badge-icon-l fa-solid fa-heart"
                      onClick={() => {
                        console.log(item.title);
                        deleteItemFromWishlistHandler(item._id);
                      }}
                    ></i>
                  </div>
                </div>

                <div class="duck-product-card-middle">
                  <p class="duck-product-card-title">{item.title}</p>
                  <p class="duck-product-card-price">{item.price}</p>
                </div>
                <div class="duck-product-card-bottom">
                  <button
                    class="duck-product-card-btn duck-btn duck-btn-solid-l duck-btn-remove-from-cart"
                    onClick={() => {
                      dispatch({
                        type: "MOVE_TO_CART_FROM_WISHLIST",
                        payload: item,
                      });
                    }}
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
