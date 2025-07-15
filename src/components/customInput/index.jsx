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
}) => {
  return (
    <div className="input-container">
      <div className="mb-2 input-div mt-2" style={containerStyle}>
        {title && (
          <label htmlFor="exampleInputEmail1" className="form-label">
            {title}
          </label>
        )}

        <input
          className="form-control input-box"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setText(e.target.value)}
          style={{ ...inputStyles, width: `${width}%` }}
        />
        {inputNote && (
          <div id="emailHelp" className="form-text">
            {inputNote}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
