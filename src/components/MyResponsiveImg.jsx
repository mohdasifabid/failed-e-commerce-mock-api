import { useNavigate } from "react-router-dom";
import "./MyResponsiveImg.css";

export const MyResponsiveImg = () => {
  const navigate = useNavigate();
  return (
    <div className="duck-square-img-container">
      <img
        className="duck-square-img duck-responsive-img"
        src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80&h=350"
        alt=""
      />
      <button
        className="duck-primary-btn-s duck-primary-btn"
        onClick={() => navigate("/products")}
      >
        Shop Now
      </button>
    </div>
  );
};
