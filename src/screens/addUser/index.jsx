import React, { useState } from "react";
import CustomInput from "../../components/customInput";
import "./styles.css";
import {
  ALL_FIELDS_ARE_REQUIRED,
  USER_ADDED_SUCCESS,
} from "../../utils/constants/messages";

const AddUser = () => {
  const [ic, setIc] = useState("");
  const [rank, setRank] = useState("");
  const [name, setName] = useState("");
  const [cdaAcNo, setCdaAcNo] = useState("");
  const [unit, setUnit] = useState("");
  const [appointment, setAppointment] = useState("");
  const [mobile, setMobile] = useState("");
  const [reportingDate, setReportingDate] = useState("");
  const [dob, setDob] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [commissionDate, setCommissionDate] = useState("");
  const [accnDate, setAccnDate] = useState("");

  const clearAllStates = () => {
    setIc("");
    setRank("");
    setName("");
    setCdaAcNo("");
    setUnit("");
    setAppointment("");
    setMobile("");
    setReportingDate("");
    setDob("");
    setMarriageDate("");
    setCommissionDate("");
    setAccnDate("");
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
      if (
        !ic ||
        !rank ||
        !name ||
        !cdaAcNo ||
        !unit ||
        !appointment ||
        !mobile ||
        !reportingDate ||
        !dob ||
        !marriageDate ||
        !commissionDate ||
        !accnDate
      ) {
        alert(ALL_FIELDS_ARE_REQUIRED);
        return;
      }

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
    <div className="login-main-container">
      <div className="row-container">
        <CustomInput
          title="IC"
          placeholder="Enter IC"
          type="text"
          value={ic}
          setText={(text) => setIc(text)}
          inputNote
        />
        <CustomInput
          title="Rank"
          placeholder="Enter Rank"
          type="text"
          value={rank}
          setText={(text) => setRank(text)}
          inputNote
        />
      </div>

      <div className="row-container">
        <CustomInput
          title="Name"
          placeholder="Enter Name"
          type="text"
          value={name}
          setText={(text) => setName(text)}
          inputNote
        />
        <CustomInput
          title="CDA (O) A/C No."
          placeholder="Enter CDA (O) A/C No."
          type="text"
          value={cdaAcNo}
          setText={(text) => setCdaAcNo(text)}
          inputNote
        />
      </div>

      <div className="row-container">
        <CustomInput
          title="Unit"
          placeholder="Enter Unit"
          type="text"
          value={unit}
          setText={(text) => setUnit(text)}
          inputNote
        />
        <CustomInput
          title="Appointment"
          placeholder="Enter Appointmet"
          type="text"
          value={appointment}
          setText={(text) => setAppointment(text)}
          inputNote
        />
      </div>

      <div className="row-container">
        <CustomInput
          title="Mobile"
          placeholder="Enter Mobile number"
          type="text"
          value={mobile}
          setText={(text) => setMobile(text)}
          inputNote
        />
        <CustomInput
          title="Date of reported"
          placeholder="Enter date of reported"
          type="text"
          value={reportingDate}
          setText={(text) => setReportingDate(text)}
          inputNote
        />
      </div>

      <div className="row-container">
        <CustomInput
          title="Date of birth"
          placeholder="Enter D.O.B."
          type="text"
          value={dob}
          setText={(text) => setDob(text)}
          inputNote
        />
        <CustomInput
          title="Date of marriage"
          placeholder="Enter Marriage anniversary date"
          type="text"
          value={marriageDate}
          setText={(text) => setMarriageDate(text)}
          inputNote
        />
      </div>

      <div className="row-container">
        <CustomInput
          title="Date of commission & seniority"
          placeholder="Enter commission date"
          type="text"
          value={commissionDate}
          setText={(text) => setCommissionDate(text)}
          inputNote
        />
        <CustomInput
          title="Date from which accn is reqd"
          placeholder="Enter accn date"
          type="text"
          value={accnDate}
          setText={(text) => setAccnDate(text)}
          inputNote
        />
      </div>
      <div className="button-container">
        <button
          type="button"
          class="btn btn-submit btn-primary btn-lg"
          // onClick={handleSubmit}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddUser;
