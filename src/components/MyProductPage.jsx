import { useEffect } from "react";
import { Layout } from "./Layout";
import { MyFilters } from "./MyFilters";
import { getCall } from "./ReusableFunctions";
import MySmallProductCard from "./MySmallProductCard";
import {useDispatch, useSelector} from "react-redux"
import { setProducts } from "../features/productSlice";

export const MyProductPage = () => {
  const reduxDispatch = useDispatch()
  const products = useSelector((state)=>state.productState.products)
  const sortPriceQuery = useSelector((state)=>state.filteredState.sortPriceQuery)
  const selectedCategories = useSelector(state=> state.filteredState.selectedCategories)
  const searchQuery = useSelector(state=> state.filteredState.searchQuery)
  useEffect(async () => {
    const data = await getCall("api/products");
    reduxDispatch(setProducts(data.products))
  }, []);

  const sortByPriceFunction = (ourData, sortMeter) => {
    const copyData = [...ourData]
    if(sortMeter === ""){
      return copyData
    }
    if (sortMeter === "lowToHigh") {
      return copyData.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortMeter === "highToLow") {
      return copyData.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return copyData;
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
    const dataCopy = [...ourData]
    if (categoryMeter.length > 0) {
      return dataCopy.filter((item) => {
        return categoryMeter.indexOf(item.categoryName) !== -1;
      });
    }
    return dataCopy;
  };
  const sortedByPriceArray =  sortByPriceFunction(
    products,
    sortPriceQuery
  );

  const searchedByInputArray = inputSearchFunction(
    sortedByPriceArray,
    searchQuery
  );
  const filterByCategoryArray = filterByCategoryFunction(
    searchedByInputArray,
    selectedCategories
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
