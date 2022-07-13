import { useEffect } from "react";
import { Layout } from "./Layout";
import { MyFilters } from "./MyFilters";
import { getCall } from "./ReusableFunctions";
import { GET_PRODUCT } from "./productActionType";
import MySmallProductCard from "./MySmallProductCard";
import { useProductProvider } from "./productProvider";

export const MyProductPage = () => {
  const { state, dispatch } = useProductProvider();
  useEffect(async () => {
    const data = await getCall("api/products");
    dispatch({ type: GET_PRODUCT, payload: data.products });
  }, []);

  const SORT_BY_PRICEFunction = (ourData, sortMeter) => {
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
  const sortedByPriceArray = SORT_BY_PRICEFunction(
    state.products,
    state.SORT_BY_PRICEMeter
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
