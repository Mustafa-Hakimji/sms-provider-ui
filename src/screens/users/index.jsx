import React, { useEffect, useState } from "react";
import "./styles.css";
import { API_URL, headerJson } from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import { SELECT_USER } from "../../utils/constants/messages";

const Users = () => {
  const navigation = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL.users, {
        method: "GET",
        headers: headerJson,
      });
      if (response.ok) {
        const formattedResponse = await response.json();
        setUsers(formattedResponse?.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (item) => {
    navigation("/user-data", { state: { item } });
  };

  const handleSelect = (id) => {
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, isSelected: !user.isSelected } : user
    );
    setUsers(updatedUsers);
  };

  const handleSendMessage = () => {
    const selected = users.filter((item) => {
      if (item.isSelected === true) {
        const user = {
          name: item.name,
          mobile: item.mobile,
        };
        return user;
      }
    });

    if (selected.length <= 0) {
      alert(SELECT_USER);
      return;
    }
    navigation("/send", { state: { users: selected, isAdd: false } });
  };

  const isSelectedUser = () => {
    let result = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i]["isSelected"]) {
        result = true;
      }
    }

    return result;
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users-container">
      {users?.map((item, index) => {
        return (
          <div
            key={item?._id}
            className="user-list-container"
            onClick={() => handleSelect(item._id)}
          >
            <input
              type="checkbox"
              checked={item?.isSelected || false}
              onChange={() => handleSelect(item._id)}
            />

            <h4 style={{ width: "30%", marginLeft: "20px", fontSize: "20px" }}>
              {item?.name}
            </h4>
            <h4 style={{ width: "30%", marginLeft: "20px", fontSize: "20px" }}>
              {item?.mobile}
            </h4>
            <h4 style={{ width: "30%", marginLeft: "20px", fontSize: "20px" }}>
              {item?.dob}
            </h4>
            <h4 style={{ width: "30%", marginLeft: "20px", fontSize: "20px" }}>
              {item?.rank}
            </h4>

            {/* <button className="btn btn-danger me-2">Edit</button> */}
            <button
              className="btn btn-success"
              onClick={() => {
                handleViewUser(item);
              }}
            >
              View
            </button>
          </div>
        );
      })}
      <button className="btn btn-primary" onClick={handleSendMessage}>
        Send Message
      </button>
      {loading && <Loading />}
    </div>
  );
};

export default Users;
