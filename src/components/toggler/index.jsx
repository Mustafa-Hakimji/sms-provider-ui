import React from "react";
import "./styles.css";
const Toggler = ({
  selected1 = false,
  selected2 = false,
  width = 100,
  title1,
  title2,
  onClick1 = () => {},
  onClick2 = () => {},
  marginLeft = 5,
}) => {
  return (
    <div
      className="toggle-container"
      style={{
        width: `${width}%`,
        justifyContent: "space-around",
        marginLeft: `${marginLeft}%`,
      }}
    >
      <button
        className={`${selected1 ? "active-toggle" : "toggle"}`}
        onClick={() => {
          onClick1();
        }}
      >
        {title1}
      </button>
      <button
        className={`${selected2 ? "active-toggle" : "toggle"}`}
        onClick={() => {
          onClick2();
        }}
      >
        {title2}
      </button>
    </div>
  );
};

export default Toggler;
