import "./MyAddressPage.css";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";
import { setAddresses, setSelectedAddress } from "../features/addressSlice";

export const MyAddressPage = () => {
  const [newAddress, setNewAddress] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const reduxDispatch = useDispatch()
  const addresses = useSelector(state=>state.addressState.addresses)
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await getCall("/api/user/address");
    reduxDispatch(setAddresses(data.address))
  }, []);

  const deleteAddressHandler = async (id) => {
    const data = await deleteCall(`/api/user/address/${id}`);
    reduxDispatch(setAddresses(data.address))

  };

  const addNewAddressHandler = async () => {
    const data = await postCall("/api/user/address", { address: newAddress });
    reduxDispatch(setAddresses(data.address))
    setDisplayModal(false);
  };

  const selectedAddressHandler = (e) => {
    let address = addresses.find((add) => add._id === e.target.value);
    reduxDispatch(setSelectedAddress(address))
    navigate("/cart");
  };
  return (
    <Layout>
      <div className="ec-address-page-container">
        <div
          className="ec-address-container"
          style={displayModal ? { border: "none" } : {}}
        >
          <div
            className="ec-delievery-addresses"
            style={displayModal ? { display: "none" } : {}}
          >
            <h3> Delievery Addresses</h3>
            {addresses.length > 0 ? null : (
              <button
                onClick={() => setDisplayModal(true)}
                className="add-address-btn"
              >
                Add Address
              </button>
            )}
            {addresses.map((user) => {
              return (
                <div className="ec-delievery-address-card" key={user._id}>
                  <input
                    type="radio"
                    name="address"
                    value={user._id}
                    onChange={(e) => selectedAddressHandler(e)}
                  />
                  <p>{user.name}</p>
                  <p>
                    <span> {user.street}</span> <span>{user.city}</span>{" "}
                  </p>
                  <p>
                    <span>{user.state}</span> <span>{user.zipCode}</span>
                  </p>
                  <p>{user.mobile}</p>
                  <span className="ec-address-edit-new-link">
                    <a
                      className="ec-editAddress-link"
                      onClick={() => navigate(`/editAddress/${user._id}`)}
                    >
                      <i className="fa-solid fa-pen-to-square address-icons"></i>
                    </a>

                    <a
                      className="ec-delete-link"
                      onClick={() => deleteAddressHandler(user._id)}
                    >
                      <i className="fa-solid fa-trash address-icons"></i>
                    </a>
                  </span>
                </div>
              );
            })}
            <a
              style={addresses.length === 0 ? { display: "none" } : {}}
              className="ec-addNewAddress-link"
              onClick={() => {
                setDisplayModal(true);
              }}
            >
              Add new address
            </a>
          </div>

          <div
            className="ec-address-page-container "
            style={displayModal ? {} : { display: "none" }}
          >
            <div className="ec-address-container">
              <div className="ec-address-form">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="street"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="city"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="state"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="zip code"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, zipCode: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="mobile"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, mobile: e.target.value })
                    }
                  />
                </div>
                <div className="ec-address-form-buttons-container">
                  <button onClick={addNewAddressHandler}>
                    Save the Address
                  </button>
                  <button onClick={() => setDisplayModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
