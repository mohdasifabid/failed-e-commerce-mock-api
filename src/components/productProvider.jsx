import { createContext, useContext, useReducer } from "react";
import {
  addCategoryFilter,
  cartData,
  getAddress,
  getCategory,
  getProduct,
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
      return {
        ...state,
        filterByCategoryMeter: action.payload,
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
