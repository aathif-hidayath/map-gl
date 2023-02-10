import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DisplayPanel from "@/components/DisplayPanel";

describe("<DisplayPanel> component", () => {
  test("Should render number of floor 97.0", async () => {
    render(
      <DisplayPanel
        buildingArea={148974.3445}
        buildingFloorArea={21548793.1548}
        buildingHeight={97.0}
        volume={145785487.699}
        plotArea={1548785.2589}
      />
    );
    const value = await screen.findByTestId("v-5");
    expect(value).toHaveTextContent("97.0");
  });

  test("Should render land area 1548785.26", async () => {
    render(
      <DisplayPanel
        buildingArea={148974.3445}
        buildingFloorArea={21548793.1548}
        buildingHeight={97.0}
        volume={145785487.699}
        plotArea={1548785.2589}
      />
    );
    const value = await screen.findByTestId("v-1");
    expect(value).toHaveTextContent("1548785.26");
  });
});
