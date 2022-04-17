import "./App.css";
import {Routes, Route} from "react-router-dom";
import { MyProductPage } from "./components/MyProductPage";
import { MyLoginPage } from "./components/MyLoginPage";
import { MyWishlistPage } from "./components/MyWishlistPage";
import { MyLandingPage } from "./components/MyLandingPage";
import { MyCart } from "./components/MyCart";

function App() { 
 
  return (<div>
    <Routes>
    <Route path="/" element={<MyLandingPage/>} />
    <Route path="/login-page" element={<MyLoginPage/>} />
    <Route path="/product-page" element={<MyProductPage/>} />
    <Route path="/wishlist-page" element={<MyWishlistPage/>} />
    <Route path="/cart-page" element={<MyCart/>} />
    </Routes>
  </div>)};

export default App;
