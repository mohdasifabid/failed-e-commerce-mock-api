import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   selectedCategories: [],
   sortPriceQuery: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addCategory: (state,action) => {
             state.selectedCategories = [...state.selectedCategories, action.payload]
            },
        removeCategory: (state,action) => {
            state.selectedCategories = [...copyOfSelectedCategories].filter(
                (item) => item !== action.payload
              );
        },
        setCategoryArray : (state, action) => {
            state.selectedCategories = action.payload
        },
        sortPriceFrom: (state, action) => {
             state.sortPriceQuery = action.payload
        }
    }
})




export const { addCategory, removeCategory,setCategoryArray, sortPriceFrom} = filterSlice.actions
export default filterSlice.reducer