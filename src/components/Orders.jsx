import React from "react";
import { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { getCall } from "./ReusableFunctions";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await getCall("/api/user/orders");
    setOrders(data.orders);
  }, []);
  return (
    <Layout>
      <div className="ec-order-page">
        {orders.length !== 0 ? (
          <h3>Your Orders</h3>
        ) : (
          <h4>
            You haven't placed any order yet,{" "}
            <a
              className="ec-products-link"
              onClick={() => navigate("/products")}
            >
              explore products
            </a>
          </h4>
        )}
        {orders && orders.map((item) => {
          return (
            <div className="ec-order-container " key={item.createdAt}>
              <div className="ec-order-leftside">
                <p>Order Status</p>
                <p>Time</p>
                <p>Payment Id: </p>
                <p>Delievered to : {item.order.address.name}</p>
                <p>{item.order.address.city}</p>
                <p>{item.order.address.mobile}</p>
              </div>
              <div className="ec-order-rightside">
                {item.order.cart.map((item) => {
                  return (
                    <React.Fragment key={item._id}>
                      <p>Item: {item.title}</p>
                      <p>{item.price}/pc</p>
                      <p>Quantity: {item.qty} </p>
                    </React.Fragment>
                  );
                })}
                <div className="ec-order-rightside-info">
                  {orders.map((item) => {
                    return (
                      <>
                        {item.order.cart.reduce((a, c) => (
                          <p>
                            {/* Total Price:<span> </span> */}
                            {/* <i className="fa-solid fa-indian-rupee-sign"></i> */}
                            <span> {Number(a.price) + Number(c.price)}</span>
                          </p>
                        ))}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
