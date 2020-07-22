import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TradeSelector from "./TradeSelector";

describe("TradeSelector", () => {
  const trades = ["plumber", "electrician"];

  test("renders label to page", () => {
    const { getByText } = render(<TradeSelector trades={trades} />);
    const labelElement = getByText(/Select your trade:/i);
    expect(labelElement).toBeInTheDocument();
  });

  test("renders correct amount of dropdown items", () => {
    const { getAllByTestId } = render(<TradeSelector trades={trades} />);
    const tradeItemNodes = getAllByTestId("trade");
    expect(tradeItemNodes.length).toBe(2);
  });

  test("shows default selection of blank option ", () => {
    const { getByTestId } = render(<TradeSelector trades={trades} />);
    const defaultOption = getByTestId(/default-blank-option/i);
    expect(defaultOption).toBeInTheDocument();
  });

  test("user can select a different option", () => {
    const { getByTestId, getAllByTestId } = render(
      <TradeSelector trades={trades} />,
    );
    const selectElement = getByTestId("trade-select");

    fireEvent.change(selectElement, {
      target: { value: trades[1] },
    });

    const tradeItemNodes = getAllByTestId("trade");
    expect(tradeItemNodes[0].selected).toBeFalsy();
    expect(tradeItemNodes[1].selected).toBeTruthy();
  });

  test("saves selection when changed", () => {
    const handleSelection = jest.fn();
    const { getByTestId } = render(
      <TradeSelector trades={trades} handleSelection={handleSelection} />,
    );
    const selectElement = getByTestId("trade-select");
    const buttonElement = getByTestId("trade-button");

    fireEvent.change(selectElement, {
      target: { value: trades[1] },
    });

    fireEvent.click(buttonElement);

    expect(handleSelection).toHaveBeenCalledWith(trades[1]);
  });
});
