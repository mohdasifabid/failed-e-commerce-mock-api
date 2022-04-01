import MySmallProductCard from "./MySmallProductCard.jsx";
import { MyLandscapeCard } from "./MyLandscapeCard.jsx";
import { MyNavbar } from "./MyNavbar.jsx";
import { MyFilters } from "./MyFilters.jsx";
import { MyFooter } from "./MyFooter.jsx";
import { MyResponsiveImg } from "./MyResponsiveImg.jsx";

export const MyLandingPage = () => {
  return (
    <div>
      <MyNavbar />
      <MyResponsiveImg />
      <MyLandscapeCard />
      <MyFooter />
    </div>
  );
};
