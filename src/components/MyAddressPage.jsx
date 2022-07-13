import "./MyAddressPage.css";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ADDRESS, GET_SELECTED_ADDRESS } from "./productActionType";
import { useProductProvider } from "./productProvider";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";

export const MyAddressPage = () => {
  const { state, dispatch } = useProductProvider();
  const [newAddress, setNewAddress] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await getCall("/api/user/address");
    dispatch({ type: GET_ADDRESS, payload: data.address });
  }, []);

  const deleteAddressHandler = async (id) => {
    const data = await deleteCall(`/api/user/address/${id}`);
    dispatch({ type: GET_ADDRESS, payload: data.address });
  };

  const addNewAddressHandler = async () => {
    const data = await postCall("/api/user/address", { address: newAddress });
    dispatch({ type: GET_ADDRESS, payload: data.address });
    setDisplayModal(false);
  };

  const selectedAddressHandler = (e) => {
    let address = state.addresses.find((add) => add._id === e.target.value);
    dispatch({ type: GET_SELECTED_ADDRESS, payload: address });
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
            {state.addresses.length > 0 ? null : (
              <button
                onClick={() => setDisplayModal(true)}
                className="add-address-btn"
              >
                Add Address
              </button>
            )}
            {state.addresses.map((user) => {
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
              style={state.addresses.length === 0 ? { display: "none" } : {}}
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
