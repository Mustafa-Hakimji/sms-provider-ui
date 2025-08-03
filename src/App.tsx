import { useState } from "react";
import { useContextHook } from "./providers";
import Home from "./screens/home";
import { Route, Routes } from "react-router-dom";
import AddUser from "./screens/addUser";
import Dashboard from "./screens/dashboard";
import Login from "./screens/login";
import Users from "./screens/users";
import SendMessage from "./screens/sendMessages";
import UserData from "./screens/userData";
import ChangePassword from "./screens/changePassword";
import MultipleMessage from "./screens/sendMultipleMessages";

function App() {
  const { userData } = useContextHook();
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* <Route index element={<Dashboard />} /> */}
        <Route index element={userData ? <SendMessage /> : <Dashboard />} />
        <Route path="/add-user/:number" element={<AddUser />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-data" element={<UserData />} />
        <Route path="/change" element={<ChangePassword />} />
        <Route path="/send" element={<MultipleMessage />} />
      </Route>
    </Routes>
  );
}

export default App;
