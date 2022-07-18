import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import wishlistReducer from "./wishlistSlice"
import categoryReducer from "./categorySlice"
import filterReducer from  "./filterSlice"

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    productState: productReducer,
    wishlistState: wishlistReducer,
    categoryState: categoryReducer,
    filteredState: filterReducer
  }
})
