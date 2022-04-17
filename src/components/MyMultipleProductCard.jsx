import "./MyMultipleProductCard.css";
import { useProductProvider } from "./productProvider";
export const MyMultipleProductCard = () => {
  const { state, dispatch } = useProductProvider();
  return (
    <div class="duck-multiple-product-card">
      <div class="duck-multiple-product-card-top">
        <p class="duck-multiple-product-card-title">
          Fresh Arrivals | Limited Offer
        </p>
      </div>
      <div class="duck-multiple-product-card-middle">
        <div class="duck-multiple-product-card-img-tag-container">
          <label htmlFor="duck-multiple-product-card-img">
            <img
              class="duck-multiple-product-card-img"
              src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <br />
            New Book
          </label>
        </div>
        <div class="duck-multiple-product-card-img-tag-container">
          <label htmlFor="duck-multiple-product-card-img">
            <img
              class="duck-multiple-product-card-img"
              src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <br />
            New Book
          </label>
        </div>
        <div class="duck-multiple-product-card-img-tag-container">
          <label htmlFor="duck-multiple-product-card-img">
            <img
              class="duck-multiple-product-card-img"
              src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <br />
            New Book
          </label>
        </div>
        <div class="duck-multiple-product-card-img-tag-container">
          <label htmlFor="duck-multiple-product-card-img">
            <img
              class="duck-multiple-product-card-img"
              src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <br />
            New Book
          </label>
        </div>
        <div class="duck-multiple-product-card-img-tag-container">
          <label htmlFor="duck-multiple-product-card-img">
            <img
              class="duck-multiple-product-card-img"
              src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <br />
            New Book
          </label>
        </div>
        <div class="duck-multiple-product-card-img-tag-container">
          <label htmlFor="duck-multiple-product-card-img">
            <img
              class="duck-multiple-product-card-img"
              src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <br />
            New Book
          </label>
        </div>
      </div>
      <button class="duck-primary-btn-xl duck-primary-btn">
        X Large Button
      </button>
    </div>
  );
};
