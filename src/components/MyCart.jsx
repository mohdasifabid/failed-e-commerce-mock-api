import "./MyCart.css";
import { useEffect } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import { useProductProvider } from "./productProvider";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";
import { useNavigate } from "react-router-dom";
import { cartData } from "./productActionType";

export const MyCart = () => {
  const { state, dispatch } = useProductProvider();
  const navigate = useNavigate();

  const totalPrice = state.cart.reduce((a, c) => {
    let priceOfAnItem = c.price * c.qty;
    return a + Number(priceOfAnItem);
  }, 0);

  useEffect(async () => {
    const data = await getCall("/api/user/cart");
    dispatch({ type: cartData, payload: data.cart });
  }, []);

  const deleteItemFromCartHandler = async (id) => {
    const data = await deleteCall(`/api/user/cart/${id}`);
    dispatch({ type: cartData, payload: data.cart });
  };

  const moveItemFromCartToWishlist = async (item) => {
    const wishlistData = await postCall("/api/user/wishlist", {
      product: item,
    });
    dispatch({ type: wishlistData, payload: wishlistData.wishlist });
    const cartData = await deleteCall(`/api/user/cart/${item._id}`);
    dispatch({ type: cartData, payload: cartData.cart });
  };

  const increaseQuantity = async (itemId) => {
    const data = await postCall(`/api/user/cart/${itemId}`, {
      action: {
        type: "increment",
      },
    });
    dispatch({ type: cartData, payload: data.cart });
  };
  const decreaseQuantity = async (itemId) => {
    const data = await postCall(`/api/user/cart/${itemId}`, {
      action: {
        type: "decrement",
      },
    });
    dispatch({ type: cartData, payload: data.cart });
  };
  return (
    <div className="body-container">
      <div className="top">
        <MyNavbar />
      </div>
      <div className="my-cart-page-body-content middle">
        <div className="ls-card">
          {state.cart.map((item) => {
            return (
              <div className="ls-card-leftside">
                <img src={item.img} alt="" className="ls-card-img" />
                <div>
                  <p className="ls-product-title">{item.title}</p>
                  <p className="ls-product-subtitle">
                    <small>
                      Price:
                      <small>
                        {" "}
                        <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
                      </small>
                      {item.price}
                    </small>
                  </p>
                  <div className="ls-card-quantity-manager">
                    <button
                      className="quantity-manager-child"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      -
                    </button>
                    <span className="quantity-manager-child">{item.qty}</span>
                    <button
                      className="quantity-manager-child"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ls-card-btn"
                    onClick={() => moveItemFromCartToWishlist(item)}
                  >
                    Move To Wishlist
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
                  <p>
                    {item.qty} x {item.price}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="duck-bill-card-total-amount">
            <p>TOTAL AMOUNT</p>
            <p>
              <i class="fa-solid fa-indian-rupee-sign"></i>
              {totalPrice}
            </p>
          </div>
          <button
            className="duck-bill-card-btn duck-btn duck-btn-solid-l"
            onClick={() => navigate("/address")}
          >
            Place Order
          </button>
        </div>
      </div>
      <div className="bottom">
        <MyFooter />
      </div>
    </div>
  );
};
