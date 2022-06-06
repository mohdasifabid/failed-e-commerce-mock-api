import "./MyAddressPage.css";
import { useEffect, useState } from "react";
import { getCall } from "./ReusableFunctions";

export const MyAddressPage = () => {
  const [address, setAddress] = useState({});
  useEffect(async () => {
    const data = await getCall("/api/user/addresses");
    setAddress(data);
  }, []);
  return (
    <div className="my-address-page">
      <div className="delievery-addresses-container">
        <h4>Delievery Addresses</h4>
        <div className="delievery-address-card">
          <label htmlFor="">
            <input type="radio" />
            <strong>Home</strong> <span>99876543210</span>
          </label>
          <p>Plot No. A, B Colony, C City, D State-120034</p>
        </div>
      </div>
      <div className="address-form">
        <div>
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Mobile No." />
        </div>
        <div>
          <input type="number" placeholder="Pin Code" />
          <input type="text" placeholder="Locality" />
        </div>
        <textarea
          className="address-input"
          type="text"
          placeholder="Address (Area and Street)"
        />
        <div>
          <input type="text" placeholder="City/District/Town" />
          <input type="text" placeholder="State" />
        </div>
        <div className="address-form-radio-btns-container">
          <label htmlFor="">
            <input type="radio" />
            <span> Home (All day delievery)</span>
          </label>
          <label htmlFor="">
            <input type="radio" />
            <span> Work ( 10am-5pm)</span>
          </label>
        </div>
        <div className="address-form-btns-container">
          <button>Save And Order</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};
