import { createContext, useContext, useReducer } from "react";

const ProductContext = createContext();
const useProductProvider = () => useContext(ProductContext);

const productChooserFunction = (state, action) => {
  switch (action.type) {
    case "SHOW_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "WISHLIST_DATA":
      return {
        ...state,
        wishlist: action.payload,
      };
    case "CART_DATA":
      return {
        ...state,
        cart: action.payload,
      };
    case "SHOW_CATEGORY":
      return {
        ...state,
        categories: action.payload,
      };
    case "SORT_BY_PRICE":
      return {
        ...state,
        sortByPriceMeter: action.payload,
      };

    case "REMOVE_CATEGORY_FILTER":
      const filteredCategory = [...state.filterByCategoryMeter];
      const updatedfilterByCategoryMeter = filteredCategory.filter(
        (item) => item !== action.payload
      );
      return {
        ...state,
        filterByCategoryMeter: updatedfilterByCategoryMeter,
      };

    case "ADD_CATEGORY_FILTER":
      return {
        ...state,
        filterByCategoryMeter: [...state.filterByCategoryMeter, action.payload],
      };

    case "SEARCH_BY_INPUT":
      return {
        ...state,
        searchByInput: action.payload,
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
  searchByInput: "",
  cart: [],
  wishlist: [],
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
