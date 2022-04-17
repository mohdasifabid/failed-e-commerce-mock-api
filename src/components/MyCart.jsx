import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import "./MyCart.css";
import { useProductProvider } from "./productProvider";
import MySmallProductCard from "./MySmallProductCard";
export const MyCart = () => {
  const { state, dispatch } = useProductProvider();

  const totalPrice = state.itemsInCart.reduce((a, c) => a + Number(c.price), 0);

  return (
    <div>
      <MyNavbar />
      <div className="my-cart-page-body-content">
        <div className="my-cart-page-body-content-cards">
          {state.itemsInCart.map((item) => {
            return (
              <div key={item._id} class="duck-product-card">
                <div class="duck-product-card-top">
                  <img class="duck-product-card-img" src={item.img} alt="" />
                  <div class="duck-product-card-badge duck-like-badge duck-like-badge-l">
                    <i class="duck-like-badge-icon duck-like-badge-icon-l fa-solid fa-heart"></i>
                  </div>
                </div>

                <div class="duck-product-card-middle">
                  <p class="duck-product-card-title">{item.title}</p>
                  <p class="duck-product-card-price">{item.price}</p>
                </div>
                <div class="duck-product-card-bottom">
                  <button
                    class="duck-product-card-btn duck-btn duck-btn-solid-l duck-btn-remove-from-cart"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item })
                    }
                  >
                    Remove from cart
                  </button>
                  <button
                    class="duck-product-card-btn duck-btn duck-btn-solid-l duck-btn-add-to-wishlist"
                    onClick={() =>
                      dispatch({
                        type: "ADD_TO_WISHLIST_FROM_CART",
                        payload: item,
                      })
                    }
                  >
                    Add to wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div class="duck-bill-card">
          <div class="duck-bill-card-title">Price Details</div>
          <div class="duck-bill-card-price-details">
            {state.itemsInCart.map((item) => {
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
