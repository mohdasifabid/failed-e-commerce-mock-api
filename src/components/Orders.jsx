import { Layout } from "./Layout";

export const Orders = () => {
  return (
    <Layout>
      <div className="ec-order-container ">
        <div className="ec-order-leftside">
          <p>Order Stutus</p>
          <p>Time</p>
          <p>Payment Id: </p>
          <p>Delievered to</p>
          <p>Address</p>
          <p>Total Price</p>
        </div>
        <div className="ec-order-rightside">
          <div className="orders-rightside-img-container">
            <img
              src="https://picsum.photos/536/354"
              alt=""
              className="ec-order-rightside-img"
            />
          </div>
          <div className="ec-order-rightside-info">
            <p>Productname</p>
            <p>price/pc</p>
            <p>Quantity: </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
