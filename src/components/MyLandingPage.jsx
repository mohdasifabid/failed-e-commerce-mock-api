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
        <div
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          Fiction
        </div>
        <div
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          Science
        </div>
        <div
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          Horror
        </div>
        <div
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/products")}
        >
          &++
        </div>
      </div>
    </Layout>
  );
};
