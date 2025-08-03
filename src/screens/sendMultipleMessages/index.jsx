import { useLocation } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { API_URL, headerJson } from "../../utils/apis";
import CustomInput from "../../components/customInput";
import {
  ALL_FIELDS_ARE_REQUIRED,
  MESSAGE_ADDED,
  MESSAGE_SENT,
  WENT_WRONG,
} from "../../utils/constants/messages";
import { isValidMobileNumber } from "../../utils/functions/commonFunctions";

const MultipleMessage = () => {
  const location = useLocation();
  const state = location.state || {};
  const data = state.users;
  const onlyAddMsg = state.isAdd;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  const getMessageList = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL.messages, {
        method: "GET",
        headers: headerJson,
      });

      const resJson = await response.json();
      if (response.ok) {
        setMessages(resJson.data);
      } else {
        alert(resJson?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addNewMessage = async () => {
    try {
      if (!title || !msg) {
        alert(ALL_FIELDS_ARE_REQUIRED);
        return;
      }

      setLoading(true);
      const response = await fetch(API_URL.messages, {
        method: "POST",
        headers: headerJson,
        body: JSON.stringify({ title, message: msg }),
      });

      const resJson = await response.json();

      if (response.ok) {
        getMessageList();
        setMsg("");
        setTitle("");
        return { result: true, message: resJson?.message };
      } else {
        alert(resJson?.message);
        return { result: false, message: resJson?.message };
      }
    } catch (error) {
      console.error(error);
      return {
        result: false,
        message: WENT_WRONG,
      };
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    const selectedMessage = [];
    for (let i = 0; i < messages.length; i++) {
      const arr = messages[i];
      if (arr._id === id) {
        if (arr["isSelected"]) {
          arr["isSelected"] = false;
          setMsg("");
          setTitle("");
        } else {
          arr["isSelected"] = true;
          setMsg(arr?.message);
          setTitle(arr?.title);
        }
      } else {
        arr["isSelected"] = false;
      }

      selectedMessage.push(arr);
    }

    setMessages(selectedMessage);
  };

  const isExistingMsg = () => {
    let result = false;
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]["isSelected"]) {
        result = true;
      }
    }
    return result;
  };

  const handleSendMessage = async () => {
    try {
      const isExist = isExistingMsg();
      if (!isExist) {
        const addMsgSuccess = await addNewMessage();
        if (!addMsgSuccess?.result) {
          alert(addMsgSuccess?.message);
          return;
        }
      }

      for (let i = 0; i < data?.length; i++) {
        await sendSms({ message: msg, number: data[i].mobile });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendSms = async ({ message = "", number = "" }) => {
    try {
      if (!number || !message) {
        alert(ALL_FIELDS_ARE_REQUIRED);
        return;
      }

      if (!isValidMobileNumber(number)) {
        alert(ENTER_VALID_NUMBER);
        return;
      }

      setLoading(true);
      const response = await fetch(API_URL.send, {
        method: "POST",
        headers: headerJson,
        body: JSON.stringify({ message, number }),
      });
      if (response.ok) {
      } else {
        alert(`Failed sending message to ${number}`);
      }
    } catch (error) {
      console.error("Error sending message--> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!onlyAddMsg) {
      getMessageList();
    }
  }, []);

  return (
    <div className="users-container">
      {!onlyAddMsg &&
        messages?.map((item, index) => {
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

              <h4
                style={{ width: "10%", marginLeft: "20px", fontSize: "20px" }}
              >
                {item?.title}
              </h4>
              <h4
                style={{ width: "90%", marginLeft: "20px", fontSize: "20px" }}
              >
                {item?.message}
              </h4>
            </div>
          );
        })}

      {loading && <Loading />}

      <div className="dash-container">
        <div className="dash-sub-container">
          <h4 style={{ color: "white" }}>
            {data?.map((item, index) => {
              if (index === data.length - 1) {
                return `${item.name}`;
              } else {
                return `${item.name}, `;
              }
            })}
          </h4>
          <div className="input-number">
            <CustomInput
              title="Message Title"
              value={title}
              setText={(e) => {
                setTitle(e);
              }}
              placeholder="Enetr title"
              width={60}
              titleStyle={{ color: "white" }}
            />

            <textarea
              rows="3"
              placeholder="Type your message..."
              className="form-control"
              style={{ resize: "vertical", width: "100%" }} // Remove this line if you want to let the user resize
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>

          <div>
            <button
              onClick={() => {
                handleSendMessage();
              }}
              type="button"
              className="btn dash-button btn-primary"
            >
              Send Message
            </button>
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default MultipleMessage;
