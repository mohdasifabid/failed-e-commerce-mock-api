import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   selectedCategories: [],
   sortPriceQuery: "",
   searchQuery: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addCategory: (state,action) => {
             state.selectedCategories = [...state.selectedCategories, action.payload]
            },
        removeCategory: (state,action) => {
            state.selectedCategories = [...state.selectedCategories].filter(
                (item) => item !== action.payload
              );
        },
        setCategoryArray : (state, action) => {
            state.selectedCategories = action.payload
        },
        sortPriceFrom: (state, action) => {
             state.sortPriceQuery = action.payload
        },
        setSearchedProducts : (state, action) => {
            state.searchQuery = action.payload
        }
    }
})




export const { addCategory, removeCategory,setCategoryArray, sortPriceFrom, setSearchedProducts} = filterSlice.actions
export default filterSlice.reducer