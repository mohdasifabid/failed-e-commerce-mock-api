export const CartCard = () => {
  return (
    <div className="ec-card-container">
      <div className="ec-ls-card-leftside">
        <img src="" alt="" className="ec-ls-card-img" />
        <div>
          <p className="ec-ls-product-title">item</p>
          <p className="ec-ls-product-subtitle">
            <small>
              Price:
              <small>
                {" "}
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
              </small>
              price
            </small>
          </p>
          <div className="ec-ls-card-quantity-manager">
            <button
              className="ec-quantity-manager-child"
              //   onClick={() => decreaseQuantityHandler(item._id)}
            >
              -
            </button>
            <span className="ec-quantity-manager-child">qty</span>
            <button
              className="ec-quantity-manager-child"
              //   onClick={() => increaseQuantityHandler(item._id)}
            >
              +
            </button>
          </div>
          <button
            className="ec-ls-card-btn"
            // onClick={() => moveItemFromCartToWishlist(item)}
          >
            Move To Wishlist
          </button>
        </div>
      </div>
      <div className="ec-bill-card">
        <div className="ec-bill-card-title">Price Details</div>
        <div className="ec-bill-card-price-details">
          {/* {state.cart.map((item) => { */}
          {/* return ( */}
          <div
            // key={item._id}
            className="ec-bill-card-price-details-content"
          >
            <p>title</p>
            <p>qty x price</p>
          </div>
          {/* ); */}
          {/* })} */}
        </div>
        <div className="ec-bill-card-total-amount">
          <p>TOTAL AMOUNT</p>
          <p>
            <i className="fa-solid fa-indian-rupee-sign"></i>
            totalPrice
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
  );
};
