import { MyResponsiveImg } from "./MyResponsiveImg.jsx";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout.jsx";

export const MyLandingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="ec-landing-page-img-container">
        <MyResponsiveImg />
      </div>
      <div className="ec-landing-page-img-container">
        <a
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          Fiction
        </a>
        <a
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          Science
        </a>
        <a
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          Horror
        </a>
        <a
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          &++
        </a>
      </div>
    </Layout>
  );
};
