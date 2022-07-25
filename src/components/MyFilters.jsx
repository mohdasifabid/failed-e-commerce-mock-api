import { useEffect } from "react";
import { getCall } from "./ReusableFunctions";
import {useDispatch, useSelector} from "react-redux"
import { setCategory } from "../features/categorySlice";
import { addCategory, removeCategory, setCategoryArray, sortPriceFrom } from "../features/filterSlice";

export const MyFilters = () => {
  const reduxDispatch = useDispatch()
  const sortPriceQuery = useSelector((state)=>state.filteredState.sortPriceQuery)
  const selectedCategories = useSelector((state)=>state.filteredState.selectedCategories)


  const categories = useSelector((state)=>state.categoryState.categories)
  useEffect(async () => {
    const data = await getCall("api/categories");
    reduxDispatch(setCategory(data.categories))
  }, []);

  return (
    <div className="ec-filters-container">
      <div className="filter-header">
        <p className="title">FILTER</p>
        <button
          className="ec-filter-clear"
          onClick={() => {
             reduxDispatch(sortPriceFrom(""))
             reduxDispatch(setCategoryArray([]))

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
          checked={sortPriceQuery === "lowToHigh"}
            value={"lowToHigh"}
            id="lowToHighPriceInput"
            type="radio"
            name="sort"
            onChange={() =>{
              reduxDispatch(sortPriceFrom("lowToHigh"))
            }}
          />
          Low to high price
        </label>
        <label htmlFor="highToLowPriceInput">
          <input
          checked={sortPriceQuery === "highToLow"}
            value={"highToLow"}
            id="highToLowPriceInput"
            type="radio"
            name="sort"
            onChange={() =>{
              reduxDispatch(sortPriceFrom("highToLow"))
            }}
          />
          High to low price
        </label>
      </div>
      <hr />
      <div className="filter-category">
        Categories
        {categories.map((item) => {
          return (
            <label htmlFor={item.id} key={item._id}>
              <input 
                checked={selectedCategories.some(cat=>cat === item.categoryName)}
                id={item.id}
                name={item.id}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    reduxDispatch(addCategory(item.categoryName))
                  } else {
                    reduxDispatch(removeCategory(item.categoryName))
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
