import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SlideController from "@/components/SlideController";

describe("Slide Controller", () => {
  test("Should render with value", async () => {
    const onChange = jest.fn();
    render(
      <SlideController
        onChange={onChange}
        value={1}
        unit={""}
        label={"Test Slider"}
      />
    );
    const value = await screen.findByTestId("value");
    expect(value).toHaveTextContent("1");
  });

  test("Should called the change", async () => {
    const onChange = jest.fn();
    render(
      <SlideController
        onChange={onChange}
        value={1}
        unit={""}
        label={"Test Slider"}
      />
    );
    fireEvent.change(screen.getByTestId(`slider`), { target: { value: 25 } });
    expect(onChange).toBeCalled();
  });
});
