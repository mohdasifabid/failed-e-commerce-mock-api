import "./MyAddressPage.css";
import { useEffect, useState } from "react";
import { getCall, postCall } from "./ReusableFunctions";
import { useProductProvider } from "./productProvider";
import { MyNavbar } from "./MyNavbar";
import { MyFooter } from "./MyFooter";

export const MyAddressPage = () => {
  const { state, dispatch } = useProductProvider();
  const [newAddress, setNewAddress] = useState({});
  useEffect(async () => {
    const data = await getCall("/api/user/address");
    setAddresses(data);
    dispatch({ type: "GET_ADDRESS", payload: data.address });
  }, []);

  const addNewAddressHandler = async () => {
    const data = await postCall("/api/user/address", { address: newAddress });
    dispatch({ type: "GET_ADDRESS", payload: data.address });
  };
  return (
    <div className="body-container">
      <div className="top">
        <MyNavbar />
      </div>
      <div className="middle my-address-page">
        <div className="address-box-container ">
          <div className="delievery-addresses-container">
            <p> Delievery Addresses</p>
            <div className="delievery-address-card">
              <label htmlFor="">
                <input type="radio" />
                <strong>Home</strong> <span>99876543210</span>
              </label>
              <p>Plot No. A, B Colony, C City, D State-120034</p>
            </div>
          </div>
          <div className="address-form">
            <p>Add New Address</p>
            <div>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Mobile No."
                onChange={(e) =>
                  setNewAddress({ ...newAddress, mobile: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Pin Code"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pinCode: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Locality"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, locality: e.target.value })
                }
              />
            </div>
            <textarea
              className="address-input"
              type="text"
              placeholder="Address (Area and Street)"
              onChange={(e) =>
                setNewAddress({ ...newAddress, address: e.target.value })
              }
            />
            <div>
              <input
                type="text"
                placeholder="City/District/Town"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="State"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />
            </div>
            <div className="address-form-radio-btns-container">
              <label htmlFor="">
                <input
                  type="radio"
                  name="address-type"
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, home: e.target.value })
                  }
                />
                <span> Home (All day delievery)</span>
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="address-type"
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, office: e.target.value })
                  }
                />
                <span> Work ( 10am-5pm)</span>
              </label>
            </div>
            <div className="address-form-btns-container">
              <button onClick={addNewAddressHandler}>Save And Order</button>
              <button>Cancel</button>
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
