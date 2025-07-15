import React, { useState } from "react";
import CustomInput from "../../components/customInput";
import "./styles.css";
import {
  ALL_FIELDS_ARE_REQUIRED,
  NO_SPACES,
} from "../../utils/constants/messages";
import { useContextHook } from "../../providers";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUserData } = useContextHook();
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputWidth = 40;

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        alert(ALL_FIELDS_ARE_REQUIRED);
        return;
      }

      if (password.includes(" ")) {
        alert(NO_SPACES);
        return;
      }

      setLoading(true);

      const response = await fetch("http://localhost:9000/log/in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        setUserData(data?.staff);
        navigation("/");
      } else {
        const error = await response.json();
        console.error("Login failed:", error.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
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

      <div className="button-container">
        <button
          type="button"
          class="btn btn-submit btn-primary btn-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
