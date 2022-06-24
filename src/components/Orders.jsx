import { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { getCall } from "./ReusableFunctions";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const data = await getCall("/api/user/orders");
    setOrders(data.orders);
  }, []);

  return (
    <Layout>
      {orders.map((item) => {
        return (
          <div className="ec-order-container " key={item.createdAt}>
            <div className="ec-order-leftside">
              <p>Order Stutus</p>
              <p>Time</p>
              <p>Payment Id: </p>
              <p>Delievered to</p>
              <p>
                <span>{item.order.address.name}</span>
                <span>{item.order.address.city}</span>
                <span>{item.order.address.mobile}</span>
              </p>
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
                {item.order.cart.map((item) => {
                  return (
                    <>
                      <p>Product Name{item.title}</p>
                      <p>{item.price}/pc</p>
                      <p>Quantity:{item.qty} </p>
                      <p>
                        Total Price: {Number(item.price) * Number(item.qty)}
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </Layout>
  );
};
