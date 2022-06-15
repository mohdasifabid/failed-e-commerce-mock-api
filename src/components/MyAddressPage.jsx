import "./MyAddressPage.css";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { getAddress } from "./productActionType";
import { useProductProvider } from "./productProvider";
import { getCall, postCall } from "./ReusableFunctions";

export const MyAddressPage = () => {
  const { dispatch } = useProductProvider();
  const [newAddress, setNewAddress] = useState({});
  useEffect(async () => {
    const data = await getCall("/api/user/address");
    setNewAddress(data);
    dispatch({ type: getAddress, payload: data.address });
  }, []);

  const addNewAddressHandler = async () => {
    const data = await postCall("/api/user/address", { address: newAddress });
    dispatch({ type: getAddress, payload: data.address });
  };

  return (
    <Layout>
      <div className="ec-address-page-container">
        <div className="ec-address-container ">
          <div className="ec-delievery-addresses">
            <p> Delievery Addresses</p>
            <div className="ec-delievery-address-card">
              <label htmlFor="">
                <input type="radio" />
                <strong>Home</strong> <span>99876543210</span>
              </label>
              <p>Plot No. A, B Colony, C City, D State-120034</p>
            </div>
          </div>
          <div className="ec-address-form">
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
              className="ec-address-input"
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
            <div className="ec-address-form-radio-buttons-container">
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
            <div className="ec-address-form-buttons-container">
              <button onClick={addNewAddressHandler}>Save And Order</button>
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
