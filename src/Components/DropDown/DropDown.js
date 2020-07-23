import React from "react";
import styled from "styled-components";

const DropDown = ({ options, message, handleChange, name }) => {
  return (
    <Wrapper>
      <div>
        <label htmlFor={name}>{message}</label>
        <select
          className="dropdown"
          onChange={handleChange}
          data-testid="dropdown"
          name={name}
        >
          <option
            data-testid="default-blank-option"
            key="default-blank-option"
            value=""
          />
          {options.map((option) => {
            return (
              <option
                className="option"
                data-testid="option"
                key={option}
                value={option}
              >
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .dropdown {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .dropdown {
      height: 30px;
      font-size: 1em;
    }
  }
`;

export default DropDown;
