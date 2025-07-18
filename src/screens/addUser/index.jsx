import React, { useState } from "react";
import "./styles.css";
import { COMPLETE_STEP } from "../../utils/constants/messages";
import UserInfo from "./components/userInfo";
import FamilyInfo from "./components/familyInfo";
import ServiceHistory from "./components/serviceHistory";
import { useParams } from "react-router-dom";

const AddUser = () => {
  const inputWidth = 80;
  const params = useParams();
  const [step, setStep] = useState(3);

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
