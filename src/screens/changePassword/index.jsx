import { useState } from "react";
import "./styles.css";
import CustomInput from "../../components/customInput";
import Loading from "../../components/loading";
import { API_URL, headerJson } from "../../utils/apis";

const ChangePassword = () => {
  const inputWidth = 100;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const clearStates = () => {
    setEmail("");
    setPassword("");
    setNewPassword("");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_URL.staffs, {
        method: "PATCH",
        headers: headerJson,
        body: JSON.stringify({ email, password, newPassword }),
      });

      const resJson = await response.json();
      if (response.ok) {
        alert(resJson?.message);
        clearStates();
      } else {
        alert(resJson?.message);
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <CustomInput
          title="Email"
          placeholder="Enter your email here"
          value={email}
          setText={(text) => setEmail(text)}
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

        <CustomInput
          title="New Password"
          placeholder="Enter your new password here"
          value={newPassword}
          setText={(text) => setNewPassword(text)}
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

export default ChangePassword;
