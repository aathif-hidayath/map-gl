import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages";

describe("<Home> Page Component", () => {
  test("Should render with value with fixed 2", async () => {
    render(<Home />);
    const value = await screen.findByTestId("home");
    expect(value).toHaveTextContent("Plot Coverage");
  });
});
