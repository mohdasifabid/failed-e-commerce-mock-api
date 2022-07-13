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
import { LOGIN_STATUS } from "./components/authActionType";
import { Layout } from "./components/Layout";
import { EditAddress } from "./components/EditAddress";
import { CartCard } from "./components/CartCard";

function App() {
  const { dispatch: authDispatch, state: authState } = useAuthProvider();

  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    if (token) {
      authDispatch({ type: LOGIN_STATUS, payload: true });
    } else {
      authDispatch({ type: LOGIN_STATUS, payload: false });
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/cart-card" element={<CartCard />} />
        <Route path="/editAddress/:id" element={<EditAddress />} />
        <Route path="/" element={<MyLandingPage />} />
        <Route path="/address" element={<MyAddressPage />} />
        <Route path="/payment" element={<MyPaymentPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/layout" element={<Layout />} />
        {authState.isLogin ? (
          <Route path="/login" element={<Navigate to="/" />} />
        ) : (
          <Route path="/login" element={<MyLoginPage />} />
        )}
        <Route path="/products" element={<MyProductPage />} />
        <Route path="/signup" element={<MySignupPage />} />
        <Route path="/wishlist" element={<PrivateRoute />}>
          <Route path="/wishlist" element={<MyWishlistPage />} />
        </Route>
        <Route path="/cart" element={<PrivateRoute />}>
          <Route path="/cart" element={<MyCart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
