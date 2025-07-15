import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useContextHook } from "../../providers";

const Dashboard = () => {
  const navigation = useNavigate();
  const { userData, setUserData } = useContextHook();

  const handleNavigation = (path) => {
    switch (path) {
      case "log-out":
        setUserData(null);
        navigation(`/${"log-in"}`);
        break;

      case "log-in":
        navigation(`/${path}`);
        break;

      case "add-user":
        if (!userData) {
          alert("Please login first");
          return;
        }
        navigation(`/${path}`);
        break;

      default:
        navigation(`/`);
        break;
    }
  };
  return (
    <div className="dash-container">
      <button
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
    </div>
  );
};

export default Dashboard;
