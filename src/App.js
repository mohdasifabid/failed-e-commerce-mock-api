import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MyCart } from "./components/MyCart";
import { MyProductPage } from "./components/MyProductPage";
import { MyLoginPage } from "./components/MyLoginPage";
import { MyWishlistPage } from "./components/MyWishlistPage";
import { MyLandingPage } from "./components/MyLandingPage";
import { useAuthProvider } from "./components/authProvider";
import { PrivateRoute } from "./components/PrivateRoute";
import { MySignupPage } from "./components/MySignupPage";
import { MyAddressPage } from "./components/MyAddressPage";
import { MyPaymentPage } from "./components/MyPaymentPage";
import { Orders } from "./components/Orders";
import { loginStatus } from "./components/authActionType";
import { Layout } from "./components/Layout";

function App() {
  const { dispatch: authDispatch, state: authState } = useAuthProvider();

  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    if (token) {
      authDispatch({ type: loginStatus, payload: true });
    } else {
      authDispatch({ type: loginStatus, payload: false });
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<MyLandingPage />} />
        <Route path="/address" element={<MyAddressPage />} />
        <Route path="/payment" element={<MyPaymentPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/layout" element={<Layout />} />
        {authState.isLogin ? (
          <Route path="/login-page" element={<Navigate to="/" />} />
        ) : (
          <Route path="/login-page" element={<MyLoginPage />} />
        )}
        <Route path="/product-page" element={<MyProductPage />} />
        <Route path="/signup-page" element={<MySignupPage />} />
        <Route path="/wishlist-page" element={<PrivateRoute />}>
          <Route path="/wishlist-page" element={<MyWishlistPage />} />
        </Route>
        <Route path="/cart-page" element={<PrivateRoute />}>
          <Route path="/cart-page" element={<MyCart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
