import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";

export const Orders = () => {
  return (
    <div className="body-container">
      <div className="top">
        <MyNavbar />
      </div>
      <div className="middle">
        <div className="orders-container ">
          <div className="orders-leftside">
            <p>Order Stutus</p>
            <p>Time</p>
            <p>Payment Id: </p>
            <p>Delievered to</p>
            <p>Address</p>
            <p>Total Price</p>
          </div>
          <div className="orders-rightside">
            <div className="orders-rightside-img-container">
              <img
                src="https://picsum.photos/536/354"
                alt=""
                className="orders-rightside-img"
              />
            </div>
            <div className="orders-rightside-info">
              <p>Productname</p>
              <p>price/pc</p>
              <p>Quantity: </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <MyFooter />
      </div>
    </div>
  );
};
