import {
  getDataWithFloors,
  getFloors,
  getCenterOfThePlot,
  getAreOfThePlot,
  getTransformedPlot,
  computeElevationWithFloorAndHeight,
  getRGB,
} from "../helper/utils";
import { CENTER, FLOORS_DATA, TEST_DATA, TEST_DATA_RESULT } from "../mock/data";

describe("getDataWithFloors", () => {
  test("altitude should 3 for 3 floors", () => {
    expect(getDataWithFloors([[[1, 8, 6]]], 3, 1)).toEqual([[[1, 8, 3]]]);
  });

  test("altitude should 6 for 2 floors", () => {
    expect(getDataWithFloors([[[1, 8, 6]]], 2, 3)).toEqual([[[1, 8, 6]]]);
  });
});

describe("getFloors", () => {
  test("altitude should multiply by 4", () => {
    expect(getFloors(TEST_DATA, 3, 4)).toEqual(FLOORS_DATA);
  });

  test("altitude return default value for omitting floor and height", () => {
    expect(getFloors(TEST_DATA)).toEqual(TEST_DATA_RESULT);
  });
});

describe("get center", () => {
  test("Should return center", () => {
    expect(getCenterOfThePlot(TEST_DATA)).toEqual(CENTER);
  });
});

describe("get area", () => {
  test("Should calculate area", () => {
    expect(getAreOfThePlot(TEST_DATA)).toBe(4061.253682958842);
  });
});

describe("getTransformedPlot", () => {
  test("Should shrink the plot", () => {
    const newPlot = getTransformedPlot(TEST_DATA, 50);
    expect(getAreOfThePlot(newPlot.geometry).toFixed(2)).toBe("1015.31");
  });

  test("Should not transform for default input", () => {
    const newPlot = getTransformedPlot(TEST_DATA);
    expect(getAreOfThePlot(newPlot.geometry).toFixed(2)).toBe("4061.25");
  });
});

describe("getRGB", () => {
  test("Should get [153, 246, 228] for odd number", () => {
    expect(getRGB(11)).toEqual([45, 212, 191]);
  });

  test("Should get [153, 246, 228] for even number", () => {
    expect(getRGB(22)).toEqual([153, 246, 228]);
  });
});

describe("computeElevationWithFloorAndHeight", () => {
  test("Should get updated elevation and floors", () => {
    expect(computeElevationWithFloorAndHeight([23, 14, 0], 4, 5)).toEqual([
      23, 14, 20,
    ]);
  });
});
