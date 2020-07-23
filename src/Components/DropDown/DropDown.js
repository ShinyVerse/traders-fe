import React from "react";

const DropDown = ({ options, message, handleChange, name }) => {
  return (
    <div>
      <label htmlFor={name}>{message}</label>
      <select onChange={handleChange} data-testid="dropdown" name={name}>
        <option
          data-testid="default-blank-option"
          key="default-blank-option"
          value=""
        />
        {options.map((option) => {
          return (
            <option data-testid="option" key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
