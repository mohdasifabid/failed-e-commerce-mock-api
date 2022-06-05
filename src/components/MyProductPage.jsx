import { useEffect } from "react";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import { MyFilters } from "./MyFilters";
import { getCall } from "./ReusableFunctions";
import MySmallProductCard from "./MySmallProductCard";
import { useProductProvider } from "./productProvider";

export const MyProductPage = () => {
  const { state, dispatch } = useProductProvider();
  useEffect(async () => {
    let data = await getCall("api/products");
    dispatch({ type: "GET_PRODUCT", payload: data.products });
  }, []);

  const sortByPriceFunction = (ourData, sortMeter) => {
    if (sortMeter === "lowToHigh") {
      return ourData.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortMeter === "highToLow") {
      return ourData.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return ourData;
  };

  const searchByInputFunction = (ourData, searchMeter) => {
    if (searchMeter && searchMeter.length > 0) {
      return ourData.filter((item) =>
        item.title.toLowerCase().includes(searchMeter.toLowerCase())
      );
    }
    return ourData;
  };

  const filterByCategoryFunction = (ourData, categoryMeter) => {
    if (categoryMeter.length > 0) {
      return ourData.filter((item) => {
        return categoryMeter.indexOf(item.categoryName) !== -1;
      });
    }
    return ourData;
  };
  const sortedByPriceArray = sortByPriceFunction(
    state.products,
    state.sortByPriceMeter
  );

  const searchedByInputArray = searchByInputFunction(
    sortedByPriceArray,
    state.searchByInput
  );
  const filterByCategoryArray = filterByCategoryFunction(
    searchedByInputArray,
    state.filterByCategoryMeter
  );
  return (
    <div>
      <MyNavbar />
      <div className="my-product-page-body-content">
        <div className="my-product-page-filters-container">
          <MyFilters />
        </div>
        <div className="my-product-page-small-cards">
          {filterByCategoryArray.map((item) => {
            return <MySmallProductCard item={item} key={item._id} />;
          })}
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
