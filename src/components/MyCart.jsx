import "./MyCart.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { cartData } from "./productActionType";
import { useNavigate } from "react-router-dom";
import { useProductProvider } from "./productProvider";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";

export const MyCart = () => {
  const { state, dispatch } = useProductProvider();
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await getCall("/api/user/cart");
    dispatch({ type: cartData, payload: data.cart });
  }, []);

  const moveItemFromCartToWishlist = async (item) => {
    const wishlistData = await postCall("/api/user/wishlist", {
      product: item,
    });
    dispatch({ type: wishlistData, payload: wishlistData.wishlist });
    const cartData = await deleteCall(`/api/user/cart/${item._id}`);
    dispatch({ type: cartData, payload: cartData.cart });
  };

  const increaseQuantityHandler = async (itemId) => {
    const data = await postCall(`/api/user/cart/${itemId}`, {
      action: {
        type: "increment",
      },
    });
    dispatch({ type: cartData, payload: data.cart });
  };

  const decreaseQuantityHandler = async (itemId) => {
    const data = await postCall(`/api/user/cart/${itemId}`, {
      action: {
        type: "decrement",
      },
    });
    dispatch({ type: cartData, payload: data.cart });
  };

  const totalPrice = state.cart.reduce((a, c) => {
    const priceOfAnItem = c.price * c.qty;
    return a + Number(priceOfAnItem);
  }, 0);

  return (
    <Layout>
      <div
        className="ec-cart-page-container"
        style={state.cart.length > 0 ? {} : { display: "none" }}
      >
        <div className="ec-ls-card">
          {state.cart.map((item) => {
            return (
              <div className="ec-ls-card-leftside" key={item._id}>
                <img src={item.img} alt="" className="ec-ls-card-img" />
                <div>
                  <p className="ec-ls-product-title">{item.title}</p>
                  <p className="ec-ls-product-subtitle">
                    <small>
                      Price:
                      <small>
                        {" "}
                        <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                      </small>
                      {item.price}
                    </small>
                  </p>
                  <div className="ec-ls-card-quantity-manager ">
                    <button
                      className="ec-quantity-manager-child ec-ls-card-btns"
                      onClick={() => decreaseQuantityHandler(item._id)}
                    >
                      -
                    </button>
                    <span className="ec-quantity-manager-child">
                      {item.qty}
                    </span>
                    <button
                      className="ec-quantity-manager-child ec-ls-card-btns"
                      onClick={() => increaseQuantityHandler(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ec-ls-card-btn ec-ls-card-btns"
                    onClick={() => moveItemFromCartToWishlist(item)}
                  >
                    Move To Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="ec-bill-card">
          <div className="ec-bill-card-title">Price Details</div>
          <div className="ec-bill-card-price-details">
            {state.cart.map((item) => {
              return (
                <div
                  key={item._id}
                  className="ec-bill-card-price-details-content"
                >
                  <p>{item.title}</p>
                  <p>
                    {item.qty} x {item.price}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="ec-bill-card-total-amount">
            <p>TOTAL AMOUNT</p>
            <p>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {totalPrice}
            </p>
          </div>
          <button
            className="ec-bill-card-btn duck-btn duck-btn-solid-l"
            onClick={() => navigate("/address")}
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
};
