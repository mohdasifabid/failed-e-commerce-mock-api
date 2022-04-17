import { MyNavbar } from "./MyNavbar.jsx";
import { MyFooter } from "./MyFooter.jsx";
import { MyResponsiveImg } from "./MyResponsiveImg.jsx";
import { useProductProvider } from "./productProvider.jsx";

export const MyLandingPage = () => {
  const { state } = useProductProvider();

  return (
    <div>
      <MyNavbar />
      <MyResponsiveImg />
      <div className="landing-page-products-sample">
        <img
          className="landing-page-products-sample-img"
          src="https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="landing-page-products-sample-img"
          src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="landing-page-products-sample-img"
          src="https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <MyFooter />
    </div>
  );
};
