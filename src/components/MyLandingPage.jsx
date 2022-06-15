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
          onClick={() => navigate("/product")}
        >
          Fiction
        </div>
        <div
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/product")}
        >
          Science
        </div>
        <div
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/product")}
        >
          Horror
        </div>
        <div
          className="ec-landing-page-category-img-card"
          alt=""
          onClick={() => navigate("/product")}
        >
          &++
        </div>
      </div>
    </Layout>
  );
};
