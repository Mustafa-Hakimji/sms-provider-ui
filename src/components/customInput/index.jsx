import React from "react";
import "./styles.css";

const CustomInput = ({
  title = "",
  placeholder = "",
  type = "text",
  containerStyle = {},
  value,
  setText = () => {},
  inputStyles = {},
  inputNote = "",
  width = 100,
  titleStyle = {},
  disabled = false,
  point = "",
}) => {
  return (
    <div className="mb-2 input-div" style={containerStyle}>
      {title && (
        <h5 htmlFor="exampleInputEmail1" className="title" style={titleStyle}>
          {point}
          {title}
        </h5>
      )}

      <input
        className="input-box"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setText(e.target.value);
        }}
        style={{ ...inputStyles, width: `${width}%` }}
        disabled={disabled}
      />
      {inputNote && (
        <div id="emailHelp" className="form-text">
          {inputNote}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
