import React, { useState } from "react";
import { useContextHook } from "../../providers";
import CustomInput from "../../components/customInput";
import Loading from "../../components/loading";
import "./styles.css";
import { API_URL, headerJson } from "../../utils/apis";

const AddStaff = () => {
  const { userData } = useContextHook();
  const inputWidth = 90;

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const clearStates = () => {
    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL.staffs, {
        method: "POST",
        headers: headerJson,
        body: JSON.stringify({
          fName,
          lName,
          email,
          phone,
          password,
          role,
        }),
      });

      const resJson = await response.json();
      if (response.ok) {
        alert(resJson.message);
        clearStates();
      } else {
        alert(resJson.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-container">
      <div className="staff-form">
        <CustomInput
          title="First name"
          placeholder="Enter First name here"
          value={fName}
          setText={(text) => setFName(text)}
          width={inputWidth}
        />
        <CustomInput
          title="Last name"
          placeholder="Enter Last name here"
          value={lName}
          setText={(text) => setLName(text)}
          width={inputWidth}
        />
        <CustomInput
          title="Email"
          placeholder="Enter email here"
          value={email}
          setText={(text) => setEmail(text)}
          width={inputWidth}
        />
        <CustomInput
          title="Mobile number"
          placeholder="Enter Mobile number here"
          value={phone}
          setText={(text) => setPhone(text)}
          width={inputWidth}
        />
        <CustomInput
          title="Role number"
          placeholder="Enter Role here"
          value={role}
          setText={(text) => setRole(text)}
          width={inputWidth}
        />
        <CustomInput
          title="Password"
          placeholder="Enter your password here"
          value={password}
          setText={(text) => setPassword(text)}
          type="password"
          width={inputWidth}
        />

        <div className="button-container">
          <button type="button" className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default AddStaff;
