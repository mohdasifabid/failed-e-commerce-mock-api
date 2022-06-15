import { MyNavbar } from "./MyNavbar.jsx";
import { MyFooter } from "./MyFooter.jsx";
import { MyResponsiveImg } from "./MyResponsiveImg.jsx";
import { useProductProvider } from "./productProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout.jsx";

export const MyLandingPage = () => {
  const { state } = useProductProvider();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="landing-page-main-container">
        <div className="landing-page-products-sample">
          <MyResponsiveImg />
        </div>
        <div className="landing-page-products-sample">
          <div
            className="landing-page-products-sample-img landing-page-cat-card"
            alt=""
            onClick={() => navigate("/product-page")}
          >
            Fiction
          </div>
          <div
            className="landing-page-products-sample-img landing-page-cat-card"
            alt=""
            onClick={() => navigate("/product-page")}
          >
            Science
          </div>
          <div
            className="landing-page-products-sample-img landing-page-cat-card"
            alt=""
            onClick={() => navigate("/product-page")}
          >
            Horror
          </div>
          <div
            className="landing-page-products-sample-img landing-page-cat-card"
            alt=""
            onClick={() => navigate("/product-page")}
          >
            &++
          </div>
        </div>
      </div>
    </Layout>
  );
};
