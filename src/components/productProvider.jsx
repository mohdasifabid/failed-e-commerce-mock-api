import { createContext, useContext, useReducer } from "react";
import {
  addCategoryFilter,
  cartData,
  getAddress,
  getCategory,
  getProduct,
  getSelectedAddress,
  removeCategoryFilter,
  resetCategoryFilter,
  searchByInput,
  sortByPrice,
  wishlistData,
} from "./productActionType";

const ProductContext = createContext();
const useProductProvider = () => useContext(ProductContext);

const productChooserFunction = (state, action) => {
  switch (action.type) {
    case getProduct:
      return {
        ...state,
        products: action.payload,
      };
    case wishlistData:
      return {
        ...state,
        wishlist: action.payload,
      };
    case cartData:
      return {
        ...state,
        cart: action.payload,
      };
    case getCategory:
      return {
        ...state,
        categories: action.payload,
      };
    case sortByPrice:
      return {
        ...state,
        sortByPriceMeter: action.payload,
      };

    case removeCategoryFilter:
      const filteredCategory = [...state.filterByCategoryMeter];
      const updatedfilterByCategoryMeter = filteredCategory.filter(
        (item) => item !== action.payload
      );
      return {
        ...state,
        filterByCategoryMeter: updatedfilterByCategoryMeter,
      };

    case addCategoryFilter:
      return {
        ...state,
        filterByCategoryMeter: [...state.filterByCategoryMeter, action.payload],
      };
    case resetCategoryFilter:
      
      const filterByCategoryMeterCopy = [...filterByCategoryMeter]
      const index = filterByCategoryMeterCopy.findIndex(item=>item.name === action.payload)
      if(action.payload === "clear_all"){
       filterByCategoryMeterCopy.splice(0, filterByCategoryMeterCopy.length)
      } else{
        filterByCategoryMeterCopy.splice(index,1)
      }
      return {
        ...state,
        filterByCategoryMeter: filterByCategoryMeterCopy,
      };
  
    case searchByInput:
      return {
        ...state,
        inputSearch: action.payload,
      };
    case getAddress:
      return {
        ...state,
        addresses: action.payload,
      };
    case getSelectedAddress:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  products: [],
  categories: [],
  sortByPriceMeter: false,
  filterByCategoryMeter: [],
  inputSearch: "",
  cart: [],
  wishlist: [],
  addresses: [],
  selectedAddress: {},
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
