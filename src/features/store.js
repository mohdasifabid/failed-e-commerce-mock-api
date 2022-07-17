import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import wishlistReducer from "./wishlistSlice"

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    productState: productReducer,
    wishlistState: wishlistReducer
  }
})
