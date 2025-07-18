import React, { useState } from "react";
import { useContextHook } from "../../providers";
import logo from "../../assets/images/logo.jpeg";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { name } = useContextHook();
  const navigation = useNavigate();
  const handleNavigation = (path) => {
    console.log(path);
    navigation(path);
  };

  const [showSignupForm, setShowSignupForm] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-color">
      <div className="container-fluid justify-content-center align-items-center">
        <div
          style={{ color: "white", fontSize: "25px" }}
          onClick={() => {
            handleNavigation("/");
          }}
          className="d-flex home-container flex-row justify-content-around align-items-center"
        >
          <img className="logo-image" src={logo} alt="logo" />
          Home
        </div>

        <div
          onClick={() => {
            handleNavigation("/");
          }}
          className="collapse navbar-collapse home-container"
          id="navbarSupportedContent"
        >
          {/* <button
            className="btn btn-outline-dark me-2"
            type="button"
            onClick={() => }
          >
            Sign Up
          </button> */}
          {/* <button
            className="btn btn-outline-primary"
            onClick={() => handleNavigation("/users")}
            data-bs-toggle="modal"
            data-bs-target="#signupModal"
            type="button"
          >
            User's List
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
