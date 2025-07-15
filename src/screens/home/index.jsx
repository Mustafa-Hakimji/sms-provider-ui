import React from "react";
import NavBar from "../../components/navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Home;
