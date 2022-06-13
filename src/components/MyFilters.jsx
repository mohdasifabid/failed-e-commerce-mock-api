import { useEffect } from "react";
import { getCall } from "./ReusableFunctions";
import { useProductProvider } from "./productProvider";
import {
  addCategoryFilter,
  getCategory,
  removeCategoryFilter,
  resetCategoryFilter,
  sortByPrice,
} from "./productActionType";

export const MyFilters = () => {
  const { state, dispatch } = useProductProvider();
  useEffect(async () => {
    const data = await getCall("api/categories");
    dispatch({ type: getCategory, payload: data.categories });
  }, []);

  return (
    <div className="filter-container">
      <div className="filter-header">
        <p className="title">FILTER</p>
        <p
          className="clear"
          onClick={() => {
            dispatch({ type: sortByPrice, payload: false });
            dispatch({ type: resetCategoryFilter, payload: [] });
          }}
        >
          CLEAR ALL
        </p>
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
              dispatch({ type: sortByPrice, payload: "lowToHigh" })
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
              dispatch({ type: sortByPrice, payload: "highToLow" })
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
                      type: addCategoryFilter,
                      payload: item.categoryName,
                    });
                  } else {
                    dispatch({
                      type: removeCategoryFilter,
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
