import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  addresses: [], 
  selectedAddress: {}
}

const addressSlice = createSlice({
    name: "addresses",
    initialState,
    reducers: {
        setAddresses: (state, action) => {
            state.addresses = action.payload
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload
        }
    }
})

export const {setAddresses, setSelectedAddress}  = addressSlice.actions
export default addressSlice.reducer