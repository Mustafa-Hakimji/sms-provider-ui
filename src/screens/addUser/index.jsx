import React, { useState } from "react";
import CustomInput from "../../components/customInput";
import "./styles.css";
import {
  ALL_FIELDS_ARE_REQUIRED,
  COMPLETE_STEP,
  USER_ADDED_SUCCESS,
} from "../../utils/constants/messages";
import { useContextHook } from "../../providers";
import UserInfo from "./components/userInfo";
import FamilyInfo from "./components/familyInfo";
import ServiceHistory from "./components/serviceHistory";
import { useParams } from "react-router-dom";

const AddUser = () => {
  const { number } = useContextHook();
  const inputWidth = 80;
  const params = useParams();
  const [step, setStep] = useState(1);

  const getActiveClass = (val) => {
    if (val === step) {
      return "add-user-steps-button-active";
    } else {
      return "add-user-steps-button";
    }
  };

  const handleStepClick = (val) => {
    if (val < step) {
      setStep(val);
    } else {
      alert(COMPLETE_STEP);
    }
  };

  const sendSms = async ({
    message = "Welcome to MHOW",
    number = "+919098604850",
  }) => {
    try {
      const response = await fetch("http://localhost:9000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, number }),
      });

      console.log("message response --> ", response);
    } catch (error) {
      console.error("Error sending message--> ", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setStep(step + 1);
      return;

      const response = await fetch("http://localhost:9000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ic,
          rank,
          name,
          cdaAcNo,
          unit,
          appointment,
          mobile,
          reportingDate,
          dob,
          marriageDate,
          commissionDate,
          accnDate,
        }),
      });
      if (response.ok) {
        const formattedResponse = await response.json();
        console.log("formattedResponse--> ", formattedResponse.user);
        const message = `Welcome to MHOW ${formattedResponse.user?.name}`;
        // clearAllStates();
        await sendSms({
          message,
          number: `+${formattedResponse.user?.mobile}`,
        });

        alert(USER_ADDED_SUCCESS);
      }
    } catch (error) {
      console.error("Error Adding User --> ", error);
    }
  };

  return (
    <div className="info-container">
      <div className="add-main-container">
        <div className="add-user-steps">
          <button
            onClick={() => handleStepClick(1)}
            className={getActiveClass(1)}
          >
            Personal Info
          </button>
          <button
            onClick={() => handleStepClick(2)}
            className={getActiveClass(2)}
          >
            Family Info
          </button>
          <button
            onClick={() => handleStepClick(3)}
            className={getActiveClass(3)}
          >
            Declarations Info
          </button>
        </div>
        {step === 1 && (
          <UserInfo
            setStep={setStep}
            number={params?.number}
            inputWidth={inputWidth}
          />
        )}
        {step === 2 && (
          <FamilyInfo
            number={params?.number}
            setStep={setStep}
            inputWidth={inputWidth}
          />
        )}
        {step === 3 && (
          <ServiceHistory
            number={params?.number}
            setStep={setStep}
            inputWidth={inputWidth}
          />
        )}
      </div>
    </div>
  );
};

export default AddUser;
