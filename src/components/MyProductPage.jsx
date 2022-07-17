import { useEffect } from "react";
import { Layout } from "./Layout";
import { MyFilters } from "./MyFilters";
import { getCall } from "./ReusableFunctions";
import MySmallProductCard from "./MySmallProductCard";
import { useProductProvider } from "./productProvider";
import {useDispatch, useSelector} from "react-redux"
import { setProducts } from "../features/productSlice";

export const MyProductPage = () => {
  const { state } = useProductProvider();
  const reduxDispatch = useDispatch()
  const products = useSelector((state)=>state.productState.products)
  useEffect(async () => {
    const data = await getCall("api/products");
    reduxDispatch(setProducts(data.products))
  }, []);

  const sortByPriceFunction = (ourData, sortMeter) => {
    if (sortMeter === "lowToHigh") {
      return ourData.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortMeter === "highToLow") {
      return ourData.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return ourData;
  };

  const inputSearchFunction = (ourData, searchMeter) => {
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
    products,
    state.sortByPriceMeter
  );

  const searchedByInputArray = inputSearchFunction(
    sortedByPriceArray,
    state.inputSearch
  );
  const filterByCategoryArray = filterByCategoryFunction(
    searchedByInputArray,
    state.filterByCategoryMeter
  );

  return (
    <Layout>
      <div className="ec-product-page-container">
        <div className="ec-product-page-filters-container">
          <MyFilters />
        </div>
        <div className="ec-product-page-cards-container">
          {filterByCategoryArray.map((item) => {
            return <MySmallProductCard item={item} key={item._id} />;
          })}
        </div>
      </div>
    </Layout>
  );
};
