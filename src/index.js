import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductProvider } from "./components/productProvider";
import {BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from "./components/authProvider";
import {Provider} from "react-redux"
import { store } from "./features/store";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <ProductProvider>
    <Provider store={store}>
      <Router>
      <App />
      </Router>
      </Provider>
    </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
