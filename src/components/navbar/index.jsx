import React, { useState } from "react";
import { useContextHook } from "../../providers";
import logo from "../../assets/images/logo.jpeg";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { setStorageItem } from "../../utils/functions/commonFunctions";
import { USER_DATA } from "../../utils/constants/localStorageKeys";

const NavBar = () => {
  const { setUserData, userData } = useContextHook();
  const navigation = useNavigate();
  const location = useLocation();

  const isPrinPage = location.pathname === "/user-data";

  const handleNavigation = (path) => {
    navigation(path);
    return;
  };

  const handleLogout = () => {
    setStorageItem(USER_DATA, null);
    setUserData(null);
    handleNavigation("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-color">
      <div className="nav-container">
        <div
          style={{ color: "white", fontSize: "25px" }}
          onClick={() => {
            handleNavigation("/");
          }}
          className="d-flex home-container flex-row justify-content-around align-items-center"
        >
          <img className="logo-image" src={logo} alt="logo" />
          {!isPrinPage && "Home"}
        </div>
        {!isPrinPage && (
          <div className="" id="navbarSupportedContent">
            {userData ? (
              <>
                <button
                  className="btn btn-danger me-2"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </button>

                <button
                  className="btn btn-dark me-2"
                  type="button"
                  onClick={() => handleNavigation("change")}
                >
                  Change Password
                </button>

                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleNavigation("/users")}
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                  type="button"
                >
                  User's List
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigation("/dashboard")}
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                  type="button"
                >
                  Add New User
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary me-2"
                type="button"
                onClick={() => handleNavigation("/log-in")}
              >
                Log In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
