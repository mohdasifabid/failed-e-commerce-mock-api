export const MyLandscapeCard = () => {
  return (
    <div class="card-landscape">
      <img
        class="card-landscape-img"
        src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <div class="card-landscape-item-right-side lc-first">
        <p class="card-landscape-title">Title </p>
        <p class="card-landscape-price">
          <small>INR</small>
          <strong class="offer-price">Price</strong>
          <small class="old-price"> INR 3999</small>
        </p>
        <p class="card-landscape-offer">50% off</p>
        <a href="" class="card-landscape-cart-link card-landscape-link">
          Add to Cart
        </a>
        <a
          href=""
          class="card-landscape-wishlist-link card-landscape-link link-with-border"
        >
          Save to Wishlist
        </a>
      </div>
    </div>
  );
};
