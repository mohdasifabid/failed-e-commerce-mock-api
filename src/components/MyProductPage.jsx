import axios from "axios";
import { useEffect } from "react";
import { MyFilters } from "./MyFilters";
import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";
import MySmallProductCard from "./MySmallProductCard";
import { useProductProvider } from "./productProvider";

export const MyProductPage = () => {
  const { state, dispatch } = useProductProvider();

  useEffect(() => {
    (async function getData() {
      const response = await axios.get("api/products");
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "SHOW_PRODUCT", payload: response.data.products });
      }
    })();
  }, []);

  const sortByPriceFunction = (ourData, sortMeter) => {
    if (sortMeter === "lowToHigh") {
      return ourData.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortMeter === "highToLow") {
      return ourData.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return ourData;
  };

  const sortedByPriceArray = sortByPriceFunction(
    state.products,
    state.sortByPriceMeter
  );
  return (
    <div>
      <MyNavbar />
      <div className="my-product-page-body-content">
        <MyFilters />
        <div className="my-product-page-small-cards">
          {sortedByPriceArray.map((item) => {
            return <MySmallProductCard item={item} key={item.id} />;
          })}
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
