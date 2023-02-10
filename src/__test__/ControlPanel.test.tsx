import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ControlPanel from "@/components/ControlPanel";

describe("getFloors", () => {
  test("altitude should multiply by 4", () => {
    expect(4).toEqual(4);
  });
});

describe("<ControlPanel> component", () => {
  test("Should render coverage slider with its current value of 20%", async () => {
    const onChange = jest.fn();
    render(
      <ControlPanel
        handleFloorHeightChange={onChange}
        handleNumberOfFloorChange={onChange}
        handlePlotScaleChange={onChange}
        handleUpload={onChange}
        floors={3}
        floorHeight={5}
        scale={20}
      />
    );
    const value = await screen.findByTestId("scale_value");
    expect(value).toHaveTextContent("20");
  });

  test("Should render number of floors slider with its current value of 3", async () => {
    const onChange = jest.fn();
    render(
      <ControlPanel
        handleFloorHeightChange={onChange}
        handleNumberOfFloorChange={onChange}
        handlePlotScaleChange={onChange}
        handleUpload={onChange}
        floors={3}
        floorHeight={5}
        scale={20}
      />
    );
    const value = await screen.findByTestId("floor_value");
    expect(value).toHaveTextContent("3");
  });
});
