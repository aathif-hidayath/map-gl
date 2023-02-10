import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Display from "@/components/Display";

describe("<Display> Component", () => {
  test("Should render with value with fixed 2", async () => {
    render(
      <Display
        sup={"2"}
        value={10987.48758}
        unit={"m"}
        label={"Building Area"}
      />
    );
    const value = await screen.findByTestId("value");
    expect(value).toHaveTextContent("10987.49");
  });

  test("Should render with value with fixed 3", async () => {
    render(
      <Display
        sup={"2"}
        value={10987.48758}
        unit={"m"}
        fractionDigits={3}
        label={"Building Area"}
      />
    );
    const value = await screen.findByTestId("value");
    expect(value).toHaveTextContent("10987.488");
  });
});
