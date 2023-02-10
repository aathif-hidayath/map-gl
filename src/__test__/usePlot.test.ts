import { renderHook, act } from "@testing-library/react";
import { usePlot } from "../hooks/usePlot";
import { TEST_DATA } from "../mock/data";

describe("usePlot hook", () => {
  test("Initial floor is 1", () => {
    const { result } = renderHook(() => usePlot());
    const { floors } = result.current;
    expect(floors).toEqual(1);
  });

  test("Updated floor is 3", () => {
    const { result } = renderHook(() => usePlot());
    act(() => result.current.handleDataUpload(TEST_DATA));
    act(() => result.current.handleNumberOfFloorChange(3));
    expect(result.current.floors).toEqual(3);
  });

  test("Floor height increased to 6", () => {
    const { result } = renderHook(() => usePlot());
    act(() => result.current.handleDataUpload(TEST_DATA));
    act(() => result.current.handleNumberOfFloorChange(3));
    act(() => result.current.handleFloorHeightChange(6));
    expect(result.current.floorHeight).toEqual(6);
  });

  test("Plot scale percentage is increased to 60", () => {
    const { result } = renderHook(() => usePlot());
    act(() => result.current.handleDataUpload(TEST_DATA));
    act(() => result.current.handlePlotScaleChange(70));
    expect(result.current.plotScale).toEqual(70);
  });
});
