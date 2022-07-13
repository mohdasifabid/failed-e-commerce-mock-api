import { useEffect } from "react";
import { getCall } from "./ReusableFunctions";
import { useProductProvider } from "./productProvider";
import {
  ADD_CATEGORY_FILTER,
  GET_CATEGORY,
  REMOVE_CATEGORY_FILTER,
  RESET_CATEGORY_FILTER,
  SORT_BY_PRICE,
} from "./productActionType";

export const MyFilters = () => {
  const { state, dispatch } = useProductProvider();
  useEffect(async () => {
    const data = await getCall("api/categories");
    dispatch({ type: GET_CATEGORY, payload: data.categories });
  }, []);

  return (
    <div className="ec-filters-container">
      <div className="filter-header">
        <p className="title">FILTER</p>
        <button
          className="ec-filter-clear"
          onClick={() => {
            // dispatch({ type: SORT_BY_PRICE, payload: false });
           
            // dispatch({ type: RESET_CATEGORY_FILTER, payload: [] });
             dispatch({type: RESET_CATEGORY_FILTER, payload: "clear_all"})
          }}
        >
          CLEAR ALL
        </button>
      </div>
      <hr />
      <div className="filter-sort">
        SORT
        <label htmlFor="lowToHighPriceInput">
          <input
            value={"lowToHigh"}
            id="lowToHighPriceInput"
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: SORT_BY_PRICE, payload: "lowToHigh" })
            }
          />
          Low to high price
        </label>
        <label htmlFor="highToLowPriceInput">
          <input
            value={"highToLow"}
            id="highToLowPriceInput"
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: SORT_BY_PRICE, payload: "highToLow" })
            }
          />
          High to low price
        </label>
      </div>
      <hr />
      <div className="filter-category">
        Categories
        {state.categories.map((item) => {
          return (
            <label htmlFor={item.id} key={item._id}>
              <input
                value={item.categoryName}
                id={item.id}
                name={item.id}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch({
                      type: ADD_CATEGORY_FILTER,
                      payload: item.categoryName,
                    });
                  } else {
                    dispatch({
                      type: REMOVE_CATEGORY_FILTER,
                      payload: item.categoryName,
                    });
                  }
                }}
              />
              {item.categoryName}
            </label>
          );
        })}
      </div>
    </div>
  );
};
