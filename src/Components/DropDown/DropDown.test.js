import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DropDown from "./DropDown";

describe("DropDown", () => {
  const trades = ["plumber", "electrician"];
  const message = "message";

  test("renders label to page", () => {
    const { getByText } = render(
      <DropDown options={trades} message={message} />,
    );
    const labelElement = getByText(message);
    expect(labelElement).toBeInTheDocument();
  });

  test("renders correct amount of dropdown items", () => {
    const { getAllByTestId } = render(<DropDown options={trades} />);
    const tradeItemNodes = getAllByTestId("option");
    expect(tradeItemNodes.length).toBe(2);
  });

  test("shows default selection of blank option ", () => {
    const { getByTestId } = render(<DropDown options={trades} />);
    const defaultOption = getByTestId(/default-blank-option/i);
    expect(defaultOption).toBeInTheDocument();
  });

  test("user can select a different option", () => {
    const handleSelection = jest.fn();
    const { getByTestId, getAllByTestId } = render(
      <DropDown options={trades} handleChange={handleSelection} />,
    );
    const selectElement = getByTestId("dropdown");

    fireEvent.change(selectElement, {
      target: { value: trades[1] },
    });

    const tradeItemNodes = getAllByTestId("option");
    expect(tradeItemNodes[0].selected).toBeFalsy();
    expect(tradeItemNodes[1].selected).toBeTruthy();
  });

  test("saves selection when changed", () => {
    let event;
    const handleSelection = jest.fn(({ target: { value } }) => {
      event = value;
    });
    const { getByTestId, getAllByTestId } = render(
      <DropDown options={trades} handleChange={handleSelection} name="trade" />,
    );
    const selectElement = getByTestId("dropdown");
    const tradeItemNodes = getAllByTestId("option");

    fireEvent.change(selectElement, {
      target: { value: trades[1] },
    });
    expect(handleSelection).toHaveBeenCalled();
    expect(event).toBe(trades[1]);
  });
});
