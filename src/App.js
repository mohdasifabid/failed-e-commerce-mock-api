import "./App.css";
import {Routes, Route} from "react-router-dom";
import { MyProductPage } from "./components/MyProductPage";
import { MyLoginPage } from "./components/MyLoginPage";
import { MyWishlistPage } from "./components/MyWishlistPage";
import { MyLandingPage } from "./components/MyLandingPage";
import { MyCart } from "./components/MyCart";
import { useEffect } from "react";
import { useAuthProvider } from "./components/authProvider";
import { PrivateRoute } from "./components/PrivateRoute";
import { MySignupPage } from "./components/MySignupPage";

function App() { 
  const {dispatch:authDispatch} = useAuthProvider()

   useEffect(()=>{
     const token = localStorage.getItem("encodedToken")
     if(token){
      authDispatch({type: "LOGIN_STATUS", payload: true}) 
     } else {
      authDispatch({type: "LOGIN_STATUS", payload: false})  

     }
   },[])
   
  return (<div>
    <Routes>
    <Route path="/" element={<MyLandingPage/>} />
    <Route path="/login-page" element={<MyLoginPage/>} />
    <Route path="/product-page" element={<MyProductPage/>} />
    <Route path="/signup-page" element={<MySignupPage/>} />


    <Route  path='/wishlist-page' element={<PrivateRoute/>}>
        <Route  path='/wishlist-page' element={<MyWishlistPage/>}/>
    </Route>

    <Route  path='/cart-page' element={<PrivateRoute/>}>
        <Route  path='/cart-page' element={<MyCart/>}/>
    </Route>

    </Routes>
  </div>)};

export default App;
