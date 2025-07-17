import React, { useEffect, useState } from "react";
import "./styles.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:9000/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const formattedResponse = await response.json();
        // console.log(formattedResponse?.users);
        setUsers(formattedResponse?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users-container">
      {users?.map((item, index) => {
        return (
          <div className="user-list-container">
            <h4 style={{ width: "30%", marginLeft: "20px", fontSize: "20px" }}>
              {item?.name}
            </h4>
            <h4 style={{ width: "30%", marginLeft: "20px", fontSize: "20px" }}>
              {item?.mobile}
            </h4>
            <h4 style={{ width: "30%", marginLeft: "20px", fontSize: "20px" }}>
              {item?.dob}
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
