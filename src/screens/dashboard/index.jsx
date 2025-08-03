import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { NUMBER_VALIDATION } from "../../utils/constants/regex";
import CustomInput from "../../components/customInput";
import { isValidMobileNumber } from "../../utils/functions/commonFunctions";
import { ENTER_VALID_NUMBER } from "../../utils/constants/messages";
import { API_URL, headerJson } from "../../utils/apis";
import Loading from "../../components/loading";

const Dashboard = () => {
  const navigation = useNavigate();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const val = e;
    if (val === "" || NUMBER_VALIDATION.test(val)) {
      setNumber(val);
    }
  };

  const addUser = async () => {
    try {
      if (!isValidMobileNumber(number)) {
        alert(ENTER_VALID_NUMBER);
        return;
      }
      setLoading(true);
      const response = await fetch(API_URL.addUser, {
        method: "POST",
        headers: headerJson,
        body: JSON.stringify({ mobile: number }),
      });

      if (response.ok) {
        const fromattedResponse = await response.json();
        navigation(`/add-user/${number}`);
      }
    } catch (error) {
      console.error("Add USER Error--> ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-container">
      <div className="dash-sub-container">
        <div className="input-number">
          <h3 className="dash-heading">Welcome to MHOW Cantt.</h3>
          <CustomInput
            title="Please Provide your Mobile number"
            value={number}
            setText={(e) => {
              handleInput(e);
            }}
            placeholder="Enetr mobile number here"
            width={100}
            titleStyle={{ color: "white" }}
          />
        </div>

        <div>
          <button
            onClick={() => addUser()}
            type="button"
            className="btn dash-button btn-primary"
          >
            Next
          </button>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Dashboard;

{
  /* <button
        onClick={() => handleNavigation("add-user")}
        type="button"
        class="btn dash-button btn-outline-primary"
      >
        Add User
      </button>

      {!userData ? (
        <button
          type="button"
          class="btn dash-button btn-outline-primary"
          onClick={() => handleNavigation("log-in")}
        >
          Login
        </button>
      ) : (
        <button
          type="button"
          class="btn dash-button btn-outline-danger"
          onClick={() => handleNavigation("log-out")}
        >
          Logout
        </button>
      )}
      <button
        type="button"
        class="btn dash-button btn-outline-primary"
        onClick={() => handleNavigation("users")}
      >
        Users List
      </button> */
}
