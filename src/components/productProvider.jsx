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

    case "ADD_TO_CART":
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload],
      };
    case "REMOVE_FROM_CART":
      const cart = [...state.itemsInCart];
      const updatedCartItems = cart.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        itemsInCart: updatedCartItems,
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        itemsInWishlist: [...state.itemsInWishlist, action.payload],
      };
    case "ADD_TO_WISHLIST_FROM_CART":
      return {
        ...state,
        itemsInCart: [...state.itemsInCart].filter(
          (item) => item.id !== action.payload.id
        ),
        itemsInWishlist: [
          ...state.itemsInWishlist,
          ...state.itemsInCart.filter((item) => item.id == action.payload.id),
        ],
      };

    case "MOVE_TO_CART_FROM_WISHLIST":
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart,
          ...state.itemsInWishlist.filter(
            (item) => item.id === action.payload.id
          ),
        ],
        itemsInWishlist: [...state.itemsInWishlist].filter(
          (item) => item.id !== action.payload.id
        ),
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
  itemsInCart: [],
  itemsInWishlist: [],
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
