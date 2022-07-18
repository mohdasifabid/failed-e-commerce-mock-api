import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MyCart } from "./components/MyCart";
import { MyProductPage } from "./components/MyProductPage";
import { MyLoginPage } from "./components/MyLoginPage";
import { MyWishlistPage } from "./components/MyWishlistPage";
import { MyLandingPage } from "./components/MyLandingPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { MySignupPage } from "./components/MySignupPage";
import { MyAddressPage } from "./components/MyAddressPage";
import { Orders } from "./components/Orders";
import { Layout } from "./components/Layout";
import { EditAddress } from "./components/EditAddress";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "./features/authSlice";

function App() {
  const reduxDispatch = useDispatch()
  const isAuthenticated = useSelector(state=>state.authState.isAuthenticated)


  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    if (token) {
      reduxDispatch(setAuthentication(true))
    } else {
      reduxDispatch(setAuthentication(true))
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/editAddress/:id" element={<EditAddress />} />
        <Route path="/" element={<MyLandingPage />} />
        <Route path="/address" element={<MyAddressPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/layout" element={<Layout />} />
        {isAuthenticated ? (
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
