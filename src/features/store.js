import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import wishlistReducer from "./wishlistSlice"
import categoryReducer from "./categorySlice"
import filterReducer from  "./filterSlice"
import addressReducer from "./addressSlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    productState: productReducer,
    wishlistState: wishlistReducer,
    categoryState: categoryReducer,
    filteredState: filterReducer,
    addressState: addressReducer,
    authState : authReducer
  }
})
