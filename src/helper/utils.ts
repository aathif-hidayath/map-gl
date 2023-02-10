import {
  center,
  area,
  Point,
  multiPolygon,
  transformScale,
  MultiPolygon,
} from "@turf/turf";
import { Feature } from "@turf/helpers";
import { Properties } from "@turf/helpers/dist/js/lib/geojson";
import { RGB, IData, Coordinates, PolyGroups } from "../@types/";

/**
 * Compute center Point of given `MultiPolygon` or `IDada` type.
 * @remarks
 * Computes using `turf` `center` helper function
 * @param data - GeoJSON data with `MultiPolygon` type
 * @example
 * to get center of the GeoJSON:
 * ```
 * // data is JSON formatted GeoJSON
 * const center = getCenterOfThePlot(data)
 * // `center` is `Feature` like {geometry: {coordinate: [45.565665, 23.343434]}}
 *
 * ```
 */
export const getCenterOfThePlot = (data: IData): Feature<Point, Properties> => {
  const feature = multiPolygon(data.coordinates);
  return center(feature);
};

/**
 * Compute 2d area with given `MultiPolygon` or `IDada` type.
 * @remarks
 * Computes using `turf` `area` helper function
 * @param data - GeoJSON data with `MultiPolygon` type
 * @example
 * to get a are for given GeoJSON:
 * ```
 * // data is JSON formatted GeoJSON
 * getAreOfThePlot(data)
 * // return 2324354.25465 (default unit is meter sqr)
 * ```
 */
export const getAreOfThePlot = (data: IData | MultiPolygon): number => {
  const feature = multiPolygon(data.coordinates);
  return area(feature);
};
/**
 * return `RGB` value to render get zebra type floors, using odd/even number.
 * @param floor - current floor number
 * @example
 * to get darker line:
 * ```
 * // will return [45, 212, 191]
 * gerRGB(3)
 * ```
 */
export const getRGB = (floor: number): RGB => {
  return floor % 2 ? [45, 212, 191] : [153, 246, 228];
};

/**
 * Scale`GeoJSON` by a factor of scaling.
 * @remarks
 * Computes using `turf` `transformScale` helper function
 * @param data - GeoJSON data with `MultiPolygon` type
 * @param scale - percentage factor to be scale.
 * @example
 * with param scale = 50 would make GeoJSON 50% smaller.
 * ```
 * // data is JSON formatted GeoJSON
 * getTransformedPlot(data, 50)
 * //  return `Feature` like {geometry: {coordinate:[[[45.565665, 23.343434], ...]]}}
 * ```
 */
export const getTransformedPlot = (
  data: IData | MultiPolygon,
  scale = 100
): Feature<MultiPolygon, Properties> => {
  const feature = multiPolygon(data.coordinates);
  return transformScale(feature, scale / 100, { origin: "center" });
};

/**
 * Helper method to calculate elevation of current `Coordinates`
 * @remarks
 * Computed using input params, return GeoJSON array length of `floor` input, and compute the elevation for each floor with `floorHeight`.
 * @param coords - Coordinates tuple of [number, number, number]
 * @param floor - Number of floors to be generated as GeoJSON
 * @param floorHeight - Current floor height in meters
 * @example
 * with param scale = 50 would make GeoJSON 50% smaller.
 * ```
 * // data is JSON formatted GeoJSON
 * computeElevationWithFloorAndHeight([45.4545,78.4545, 0], 3, 6)
 * //  will return `Coordinates` [45.4545,78.4545, 18]
 * ```
 */
export const computeElevationWithFloorAndHeight = (
  coords: Coordinates,
  floor: number,
  floorHeight: number
): Coordinates => [coords[0], coords[1], floor * floorHeight];

/**
 * Helper method to update multiple floor data with scaled building plot and floor elevation
 * @remarks
 * Computed using input params, return array of `PolyGroups` with length of `floor` input, and compute the elevation for each floor with `floorHeight`.
 * @param cords - Coordinates array `PolyGroups`
 * @param floor - Number of floors to be generated as GeoJSON
 * @param floorHeight - Current floor height in meters
 * @example
 * with param scale = 50 would make GeoJSON 50% smaller.
 * ```
 * // data is JSON formatted GeoJSON
 * getDataWithFloors(cords, 3, 6)
 * //  will return `PolyGroups` type with computed elevations
 * ```
 */
export const getDataWithFloors = (
  cords: PolyGroups,
  floor: number,
  floorHeight: number
): PolyGroups =>
  cords.map((_c) =>
    _c.map((__c) => computeElevationWithFloorAndHeight(__c, floor, floorHeight))
  );

/**
 * Helper method to get final GeoJSON array from initially uploaded data
 * @remarks
 * Computed using input params, return array of GeoJSON with the length of `floor` input, and compute the elevation for each floor with `floorHeight`.
 * @param data - GeoJSON data type initially loaded from last upload, passing from internal app state.
 * @param numberOfFloors - Number of floors from internal state
 * @param floorHeight - Current floor height from internal state
 * @example
 * to get updated GeoJSON for 3 floor and 6m of floorHeight:
 * ```
 * // data is JSON formatted GeoJSON
 * getDataWithFloors(data, 3, 6)
 * //  will return `[GeoJSON, GeoJSON, GeoJSON]` type with computed elevations & colors.
 * ```
 */
export const getFloors = (
  data: IData | MultiPolygon,
  numberOfFloors = 1,
  floorHeight = 3
): Array<IData & { color: RGB; elevation: number }> =>
  Array.from(Array(numberOfFloors).keys()).map((floor) => ({
    type: data.type,
    elevation: floorHeight,
    color: getRGB(floor),
    coordinates: [
      getDataWithFloors(data.coordinates[0] as PolyGroups, floor, floorHeight),
    ],
  }));
