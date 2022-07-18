import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartData: (state, action)=> {state.cart= action.payload}
        
    }  
    
})

export const {setCartData} = cartSlice.actions
export default cartSlice.reducer