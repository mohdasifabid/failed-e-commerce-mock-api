import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import "./MyWishlistPage.css";
import { useProductProvider } from "./productProvider";
export const MyWishlistPage = () => {
  const { state, dispatch } = useProductProvider();

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
