import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { postCall } from "./ReusableFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { setAddresses } from "../features/addressSlice";

export const EditAddress = () => {
  const [updatedAddress, setUpdatedAddress] = useState({});
  const reduxDispatch = useDispatch()
  const addresses = useSelector(state=>state.addressState.addresses)

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const addressToEdit = addresses.find((add) => add._id === id);
    setUpdatedAddress(addressToEdit);
  }, []);

  const addressUpdateHandler = async () => {
    const data = await postCall(`/api/user/address/${id}`, {
      address: updatedAddress,
    });
    reduxDispatch(setAddresses(data.address))
    navigate("/address");
  };

  return (
    <Layout>
      <div className="ec-address-page-container ">
        <div className="ec-address-container ec-new-address-container  ">
          <div className="ec-address-form">
            <div>
              <input
                value={updatedAddress.name}
                type="text"
                placeholder="name"
                onChange={(e) =>
                  setUpdatedAddress({ ...updatedAddress, name: e.target.value })
                }
              />

              <input
                value={updatedAddress.street}
                type="text"
                placeholder="street"
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    street: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <input
                value={updatedAddress.pinCode}
                type="text"
                placeholder="city"
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    city: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="state"
                value={updatedAddress.state}
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    state: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                value={updatedAddress.zipCode}
                type="number"
                placeholder="zipcode"
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    zipCode: e.target.value,
                  })
                }
              />
              <input
                value={updatedAddress.mobile}
                type="number"
                placeholder="mobile"
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    mobile: e.target.value,
                  })
                }
              />
            </div>
            <div className="ec-address-form-buttons-container">
              <button onClick={addressUpdateHandler}>Update Address</button>
              <button onClick={() => navigate("/address")}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
