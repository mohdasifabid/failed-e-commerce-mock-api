import "./MyCart.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";
import {useSelector, useDispatch} from "react-redux"
import { setCartData } from "../features/cartSlice";

export const MyCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state)=>state.cartState.cart)
  const selectedAddress = useSelector(state=>state.addressState.selectedAddress)
  const reduxDispatch = useDispatch()
  const { name, street, city, zipCode } = selectedAddress;
  useEffect(async () => {
    const data = await getCall("/api/user/cart");
    reduxDispatch(setCartData(data.cart))
  }, []);

  const moveItemFromCartToWishlist = async (item) => {
    const wishlistResponse = await postCall("/api/user/wishlist", {
      product: item,
    });
    const cartResponse = await deleteCall(`/api/user/cart/${item._id}`);
    reduxDispatch(setCartData(cartResponse.cart))
  };

  const increaseQuantityHandler = async (itemId) => {
    const data = await postCall(`/api/user/cart/${itemId}`, {
      action: {
        type: "increment",
      },
    });
    reduxDispatch(setCartData(data.cart))
  };

  const decreaseQuantityHandler = async (itemId) => {
    const data = await postCall(`/api/user/cart/${itemId}`, {
      action: {
        type: "decrement",
      },
    });
    reduxDispatch(setCartData(data.cart))

  };

  const totalPrice = cart.reduce((a, c) => {
    const priceOfAnItem = c.price * c.qty;
    return a + Number(priceOfAnItem);
  }, 0);

  const postOrderHandler = async () => {
    let cartItems = cart;
    const data = await postCall("/api/user/orders", {
      order: { cart: cartItems, address: selectedAddress },
    });
    navigate("/orders");
  };
  return (
    <Layout>
      <div
        className="ec-cart-page-container"
        style={cart.length > 0 ? {} : { display: "none" }}
      >
        <div className="ec-ls-card">
          {Object.keys(selectedAddress).length === 0 && (
            <button
              className="ec-bill-card-btn duck-btn duck-btn-solid-l ec-bill-card-btn-left"
              onClick={() => navigate("/address")}
            >
              Select address
            </button>
          )}
          {cart.map((item) => {
            return (
              <div className="ec-ls-card-leftside" key={item._id}>
                <img src={item.img} alt="" className="ec-ls-card-img" />
                <div>
                  <p className="ec-ls-product-title">{item.title}</p>
                  <p className="ec-ls-product-subtitle">
                    <small>
                      Price:
                      <small>
                        <i className="fa-solid fa-indian-rupee-sign"></i>
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
          <div className="ec-bill-card">
            {Object.keys(selectedAddress).length !== 0 && (
              <>
                <p>
                  Address: <strong>{name}</strong>
                </p>
                <p>{street},</p>
                <p>{city}</p>
                <p>
                  {selectedAddress.state},{zipCode}
                </p>
              </>
            )}
            <div className="ec-bill-card-title">Payment Details</div>
            <div className="ec-bill-card-price-details">
              {cart.map((item) => {
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
            
            < div className="ec-bill-card-total-amount">
              <p>TOTAL AMOUNT</p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {totalPrice}
              </p>
            </div>
            {Object.keys(selectedAddress).length !== 0 && (
              <button
                className="ec-bill-card-btn duck-btn duck-btn-solid-l ec-bill-card-change-address"
                onClick={() => navigate("/address")}
              >
                Change address
              </button>
            )}
            {Object.keys(selectedAddress).length !== 0 ? (
              <button
                className="ec-bill-card-btn duck-btn duck-btn-solid-l"
                onClick={postOrderHandler}
              >
                Place Order
              </button>
            ) : (
              <button
                disabled
                className="ec-bill-card-btn duck-btn duck-btn-solid-l"
                onClick={postOrderHandler}
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
