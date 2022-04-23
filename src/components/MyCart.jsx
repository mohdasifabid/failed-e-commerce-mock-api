import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import "./MyCart.css";
import { useProductProvider } from "./productProvider";
import { useEffect } from "react";
import axios from "axios";
export const MyCart = () => {
  const { state, dispatch } = useProductProvider();
  const totalPrice = state.cart.reduce((a, c) => a + Number(c.price), 0);

  useEffect(() => {
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
  }, []);

  const deleteItemFromCartHandler = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.delete(`/api/user/cart/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
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

  const moveItemFromCartToWishlist = async (item) => {
    const token = localStorage.getItem("encodedToken");
    // *****Step--1 : post the item to cart using post api
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
    console.log(response);
    // *****Step--2 : now delete this item from cart, using #delete api
    const deleteItem = async (id) => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.delete(`/api/user/cart/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return response;
    };
    deleteItem(item._id);
    // By far both post and delete are working but they are updating on their respective place once we visit that.
    // So, ***** Step--3 : would involves calling of two function with get api to update the cart & wishlist on run time.

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
  };

  return (
    <div>
      <MyNavbar />
      <div className="my-cart-page-body-content">
        <div className="my-cart-page-body-content-cards">
          {state.cart.map((item) => {
            return (
              <div key={item._id} class="duck-product-card">
                <div class="duck-product-card-top">
                  <img class="duck-product-card-img" src={item.img} alt="" />
                  <div class="duck-product-card-badge duck-like-badge duck-like-badge-l">
                    <i
                      class="duck-like-badge-icon duck-like-badge-icon-l fa-solid fa-heart"
                      onClick={() => {
                        deleteItemFromCartHandler(item._id);
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
                      deleteItemFromCartHandler(item._id);
                    }}
                  >
                    Remove from cart
                  </button>
                  <button
                    class="duck-product-card-btn duck-btn duck-btn-solid-l duck-btn-add-to-wishlist"
                    onClick={() => moveItemFromCartToWishlist(item)}
                  >
                    Move to wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div class="duck-bill-card">
          <div class="duck-bill-card-title">Price Details</div>
          <div class="duck-bill-card-price-details">
            {state.cart.map((item) => {
              return (
                <div
                  key={item._id}
                  class="duck-bill-card-price-details-content"
                >
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </div>
              );
            })}
          </div>
          <div class="duck-bill-card-total-amount">
            <p>TOTAL AMOUNT</p>
            <p>{totalPrice}</p>
          </div>
          <div class="duck-bill-card-saving-info">
            You will save Rs1999 on this order
          </div>
          <button class="duck-bill-card-btn duck-btn duck-btn-solid-l">
            Place Order{" "}
          </button>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
