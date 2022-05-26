import axios from "axios";
import { useEffect } from "react";
import { useProductProvider } from "./productProvider";

export const MyFilters = () => {
  const { state, dispatch, sortedByPriceArray } = useProductProvider();
  useEffect(() => {
    (async function getData() {
      const response = await axios.get("api/categories");
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "SHOW_CATEGORY", payload: response.data.categories });
      }
    })();
  }, []);
  return (
    <div className="filter-container">
      <div className="filter-header">
        <p className="title">FILTER</p>
        <p className="clear">CLEAR ALL</p>
      </div>
      <hr />
      <div className="filter-sort">
        SORT
        <label htmlFor="lowToHighPriceInput">
          <input
            id="lowToHighPriceInput"
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
            }
          />
          Low to high price
        </label>
        <label htmlFor="highToLowPriceInput">
          <input
            id="highToLowPriceInput"
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })
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
                id={item.id}
                name={item.id}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch({
                      type: "ADD_CATEGORY_FILTER",
                      payload: item.categoryName,
                    });
                  } else {
                    dispatch({
                      type: "REMOVE_CATEGORY_FILTER",
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
