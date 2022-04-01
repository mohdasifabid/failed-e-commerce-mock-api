export const MyNavbar = () => {
  return (
    <div class="nav-container">
      <p class="nav-name">Company</p>
      <div class="nav-input-container">
        <input class="nav-input" type="text" placeholder="search here" />
        <i class="fa-solid fa-magnifying-glass nav-search-icon"></i>
      </div>
      <span class="nav-login nav-icon-and-tag">
        Login
        <i class="fa-solid fa-user"></i>
      </span>
      <span class="nav-wishlist nav-icon-and-tag">
        Wishlist
        <i class="fa-solid fa-heart"></i>
      </span>
      <span class="nav-cart nav-icon-and-tag">
        Cart
        <i class="fa-solid fa-cart-shopping"></i>
      </span>
    </div>
  );
};
