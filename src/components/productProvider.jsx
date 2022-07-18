import { createContext, useContext, useReducer } from "react";
// import {
//   ADD_CATEGORY_FILTER,
//   CART_DATA,
//   GET_ADDRESS,
//   GET_CATEGORY,
//   GET_PRODUCT,
//   GET_SELECTED_ADDRESS,
//   REMOVE_CATEGORY_FILTER,
//   RESET_CATEGORY_FILTER,
//   SEARCH_BY_INPUT,
//   SORT_BY_PRICE,
//   WISHLIST_DATA,
// } from "./productActionType";

const ProductContext = createContext();
const useProductProvider = () => useContext(ProductContext);

const productChooserFunction = (state, action) => {
  switch (action.type) {
    // case GET_PRODUCT:
    //   return {
    //     ...state,
    //     products: action.payload,
    //   };
    // case WISHLIST_DATA:
    //   return {
    //     ...state,
    //     wishlist: action.payload,
    //   };
    // case CART_DATA:
    //   return {
    //     ...state,
    //     cart: action.payload,
    //   };
    // case GET_CATEGORY:
    //   return {
    //     ...state,
    //     categories: action.payload,
    //   };
    // case SORT_BY_PRICE:
    //   return {
    //     ...state,
    //     sortByPriceMeter: action.payload,
    //   };

    // case REMOVE_CATEGORY_FILTER:
    //   const filteredCategory = [...state.filterByCategoryMeter];
    //   const updatedfilterByCategoryMeter = filteredCategory.filter(
    //     (item) => item !== action.payload
    //   );
    //   return {
    //     ...state,
    //     filterByCategoryMeter: updatedfilterByCategoryMeter,
    //   };

    // case ADD_CATEGORY_FILTER:
    //   return {
    //     ...state,
    //     filterByCategoryMeter: [...state.filterByCategoryMeter, action.payload],
    //   };
    // case RESET_CATEGORY_FILTER:
    //   if(action.payload === "clear_all"){
    //     return {
    //       ...state,
    //       filterByCategoryMeter: [],
    //       sortByPriceMeter: false,
    //     }
    //   } 
  
    // case SEARCH_BY_INPUT:
    //   return {
    //     ...state,
    //     inputSearch: action.payload,
    //   };
  //   case GET_ADDRESS:
  //     return {
  //       ...state,
  //       addresses: action.payload,
  //     };
  //   case GET_SELECTED_ADDRESS:
  //     return {
  //       ...state,
  //       selectedAddress: action.payload,
  //     };
  //   default:
  //     return state;
  }
};

const initialState = {
  // products: [],
  // categories: [],
  // sortByPriceMeter: false,
  // filterByCategoryMeter: [],
  // inputSearch: "",
  // cart: [],
  // wishlist: [],
  // addresses: [],
  // selectedAddress: {},
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productChooserFunction, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, useProductProvider };
