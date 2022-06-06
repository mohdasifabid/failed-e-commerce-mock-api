import "./MyCart.css";
import { useEffect } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import { useProductProvider } from "./productProvider";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";

export const MyCart = () => {
  const { state, dispatch } = useProductProvider();

  const totalPrice = state.cart.reduce((a, c) => a + Number(c.price), 0);

  useEffect(async () => {
    const data = await getCall("/api/user/cart");
    dispatch({ type: "CART_DATA", payload: data.cart });
  }, []);

  const deleteItemFromCartHandler = async (id) => {
    const data = await deleteCall(`/api/user/cart/${id}`);
    dispatch({ type: "CART_DATA", payload: data.cart });
  };

  const moveItemFromCartToWishlist = async (item) => {
    const wishlistData = await postCall("/api/user/wishlist", {
      product: item,
    });
    dispatch({ type: "WISHLIST_DATA", payload: wishlistData.wishlist });
    const cartData = await deleteCall(`/api/user/cart/${item._id}`);
    dispatch({ type: "CART_DATA", payload: cartData.cart });
  };

  return (
    <div>
      <MyNavbar />
      <div className="my-cart-page-body-content">
        <div className="my-cart-page-body-content-cards">
          {state.cart.map((item) => {
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
                      onClick={() => {
                        deleteItemFromCartHandler(item._id);
                      }}
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
                    onClick={() => {
                      deleteItemFromCartHandler(item._id);
                    }}
                  >
                    Remove from cart
                  </button>
                  <button
                    className="duck-product-card-btn duck-btn duck-btn-solid-l duck-btn-add-to-wishlist"
                    onClick={() => moveItemFromCartToWishlist(item)}
                  >
                    Move to wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="duck-bill-card">
          <div className="duck-bill-card-title">Price Details</div>
          <div className="duck-bill-card-price-details">
            {state.cart.map((item) => {
              return (
                <div
                  key={item._id}
                  className="duck-bill-card-price-details-content"
                >
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </div>
              );
            })}
          </div>
          <div className="duck-bill-card-total-amount">
            <p>TOTAL AMOUNT</p>
            <p>{totalPrice}</p>
          </div>
          <div className="duck-bill-card-saving-info">
            You will save Rs1999 on this order
          </div>
          <button className="duck-bill-card-btn duck-btn duck-btn-solid-l">
            Place Order{" "}
          </button>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
