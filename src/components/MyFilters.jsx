import axios from "axios";
import { useEffect } from "react";
import { useProductProvider } from "./productProvider";

export const MyFilters = () => {
  const { state, dispatch, sortedByPriceArray } = useProductProvider();
  useEffect(() => {
    (async function getData() {
      const response = await axios.get("api/categories");
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "SHOW_CATEGORY", payload: response.data.categories });
      }
    })();
  }, []);
  return (
    <div class="filter-container">
      <div class="filter-header">
        <p class="title">FILTER</p>
        <p class="clear">CLEAR ALL</p>
      </div>
      <hr />
      <div class="filter-sort">
        SORT
        <label for="">
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
            }
          />
          Low to high price
        </label>
        <label for="">
          <input
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
      <div class="filter-category">
        Categories
        {state.categories.map((item) => {
          return (
            <label for={item.id} key={item._id}>
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

/*
const removalCategory = [...state.sortByCategory];
      const indexRemoval = removalCategory.indexOf(action.payload);
      removalCategory.splice(indexRemoval, 1);
      console.log(removalCategory);
      return { ...state, sortByCategory: removalCategory };
*/
