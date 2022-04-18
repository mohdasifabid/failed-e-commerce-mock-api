import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductProvider } from "./components/productProvider";
import {BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from "./components/authProvider";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <ProductProvider>
      <Router>
      <App />
      </Router>
    </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
