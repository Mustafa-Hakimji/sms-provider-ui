import React, { useState } from "react";
import CustomInput from "../../components/customInput";
import { NUMBER_VALIDATION } from "../../utils/constants/regex";
import "./styles.css";
import { API_URL } from "../../utils/apis";
import { isValidMobileNumber } from "../../utils/functions/commonFunctions";
import {
  ALL_FIELDS_ARE_REQUIRED,
  ENTER_VALID_NUMBER,
} from "../../utils/constants/messages";
import Loading from "../../components/loading";

const SendMessage = () => {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState("");
  const [msg, setMsg] = useState("");

  const clearAllStates = () => {
    setNumber("");
    setMsg("");
  };

  const handleInput = (e) => {
    const val = e;
    if (val === "" || NUMBER_VALIDATION.test(val)) {
      setNumber(val);
    }
  };

  const sendSms = async ({ message = "", number = "" }) => {
    try {
      if (!number || !message) {
        alert(ALL_FIELDS_ARE_REQUIRED);
        return;
      }

      if (!isValidMobileNumber(number)) {
        alert(ENTER_VALID_NUMBER);
        return;
      }

      setLoading(true);
      const response = await fetch(API_URL.send, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, number }),
      });

      if (response.ok) {
        alert(`Message sent successfully.\n ${message}\nto ${number}`);
        clearAllStates();
      }
    } catch (error) {
      console.error("Error sending message--> ", error);
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
            width={60}
            titleStyle={{ color: "white" }}
          />

          <textarea
            rows="3"
            placeholder="Type your message..."
            className="form-control"
            style={{ resize: "vertical", width: "100%" }} // Remove this line if you want to let the user resize
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>

        <div>
          <button
            onClick={() => sendSms({ number: number, message: msg })}
            type="button"
            className="btn dash-button btn-primary"
          >
            Send Message
          </button>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default SendMessage;
