import "./MyCart.css";
import { useEffect } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import { useProductProvider } from "./productProvider";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";
import { useNavigate } from "react-router-dom";

export const MyCart = () => {
  const { state, dispatch } = useProductProvider();
  const navigate = useNavigate();

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
          <button
            className="duck-bill-card-btn duck-btn duck-btn-solid-l"
            onClick={() => navigate("/address")}
          >
            Place Order
          </button>
        </div>
      </div>
      {/*  */}
      {state.cart.map((item) => {
        return (
          <div className="ls-card">
            <div className="ls-card-leftside">
              <img src={item.img} alt="" className="ls-card-img" />
              <div>
                <p className="ls-product-title">{item.title}</p>
                <p className="ls-product-subtitle">
                  <small>Price: {item.price}</small>
                </p>
                <div className="ls-card-quantity-manager">
                  <button className="quantity-manager-child">-</button>
                  <span className="quantity-manager-child">2</span>
                  <button className="quantity-manager-child">+</button>
                </div>
                <button className="ls-card-btn">Move To Wishlist</button>
              </div>
            </div>
            <div className="ls-card-rightside">
              <div>
                <span>Total MRP</span>
                <span>Total Price</span>
              </div>
              <div>
                <span>Discount</span>
                <span>Discount</span>
              </div>
              <div>
                <span>Amount to be Paid</span>
                <span>12123</span>
              </div>
              <button className="ls-card-rightside-btn">Place Order</button>
            </div>
          </div>
        );
      })}
      <MyFooter />
    </div>
  );
};
