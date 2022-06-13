import "./MyResponsiveImg.css";
import { Link } from "react-router-dom";

export const MyResponsiveImg = () => {
  return (
    <div className="duck-square-img-container">
      <img
        className="duck-square-img duck-responsive-img"
        src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80&h=350"
        alt=""
      />
      <Link className="duck-primary-btn-s duck-primary-btn" to="/product-page">
        Shop Now
      </Link>
    </div>
  );
};
