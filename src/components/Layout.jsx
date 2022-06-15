import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import "./layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="ec-layout-body">
      <div className="ec-navbar-container">
        <MyNavbar />
      </div>
      <div className="ec-layout-child-container">{children}</div>
      <div className="ec-footer-container">
        <MyFooter />
      </div>
    </div>
  );
};
