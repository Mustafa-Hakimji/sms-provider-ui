import { useState } from "react";
import ContextProvider from "./providers";
import Home from "./screens/home";
import { Route, Routes } from "react-router-dom";
import AddUser from "./screens/addUser";
import Dashboard from "./screens/dashboard";
import Login from "./screens/login";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/log-in" element={<Login />} />
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
