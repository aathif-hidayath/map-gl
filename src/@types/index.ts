import { MapViewState } from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";

/**
 * Handles the Slider value change
 * @param value - Current slider value as number (default value is between 1 - 100)
 */
export type ValueChangerFunction = (value: number) => void;

/**
 * 'geojson' document uploader function
 * @param data - after json file upload file contents will parsed to JSOn format and pass as prop
 */
export type DataUploaderFunction = (data: IData) => void;

/**
 * Coordinates are tuple with 3 numbers as [lat, lng, elevation]
 * @example
 * Here's a simple example:
 * ```
 * [6.45487, 48.15487, 3]
 * ```
 */
export type Coordinates = [number, number, number];

/**
 * RGB is tuple with 3 numbers, each number represent value between 0 to 255.
 * @example
 * Here's a simple example:
 * ```
 * // yellow color equal to hex #FF0000
 * [255, 0, 0]
 * ```
 */
export type RGB = [number, number, number];

/**
 * PloyGroups is multi level wrapped array of `Coordinates`
 * @example
 * ```
 * [[[47.1454,8.45454, 0]]]
 * ```
 */
export type PolyGroups = Array<Array<Coordinates>>;

/**
 * IData local definition type for GeoJSON
 * @example
 * ```
 * { type: "MultiPolygon", "coordinates": [[[[6.82386387,46.469095495],[6.823902186,46.46908068],...]]] }
 * ```
 */
export interface IData {
  /** Type of the `GeoJSON` in our case it's only `MultiPolygon` */
  type: string;
  /**Array of `PolyGroups` */
  coordinates: Array<PolyGroups>;
}

export interface UsePlotReturnType {
  /** Handler function after upload the `.geojson` doc */
  handleDataUpload: DataUploaderFunction;

  /** Handler function after floor height Slider onchange */
  handleFloorHeightChange: ValueChangerFunction;

  /** Handler function after number of floors Slider onchange */
  handleNumberOfFloorChange: ValueChangerFunction;

  /** Handler function after plot scale Slider onchange */
  handlePlotScaleChange: ValueChangerFunction;

  /** Plot area value calculates using current plot area's coordinates with `tursf` `area` helper. m2 unit */
  plotArea: number;

  /** Building's area value calculates using current building's coordinates with `tursf` `area` helper, m2 unit */
  buildingArea: number;

  /** Building's floor area value calculates using current plots coordinates with `tursf` `area` helper and multiplied with `floors` value. m2 unit */
  buildingFloorArea: number;

  /** Building's Height is calculated by total floors X floors height. m2 unit  */
  buildingHeight: number;

  /** Building's Volume is calculated buildingHeight X buildingArea. m3 unit  */
  volume: number;

  /** Layers is Array of GeoJsonLayer type generated using currentPlot data stored in the state */
  layers: Array<GeoJsonLayer>;

  /** The number of floors stored in the state, updated from Floors MUI Slider component */
  floors: number;

  /** The height of floor stored in the state, updated from Floor Height MUI Slider component */
  floorHeight: number;

  /** The scale of building area in percentage, stored in the state, updated from Plot Scale MUI Slider component */
  plotScale: number;

  /** The current viewState of the GL map, its center updates and animated to new center when each time new data uploaded, each new plot scanned and find the center of the plot by using 'turf's center helper function */
  viewState: MapViewState;
}

/**
 * Custom hook function
 */
export type UsePlotFunction = () => UsePlotReturnType;

/**
 * Props local definition for ControlPanel prop type
 */
export interface ControlPanelProps {
  /** Plot scale slider change handler */
  handlePlotScaleChange: ValueChangerFunction;

  /** Plot scale value in percentage */
  scale: number;

  /** Building's number of floors slider change handler */
  handleNumberOfFloorChange: ValueChangerFunction;

  /** Building's number of floor value */
  floors: number;

  /** Building's floor height slider change handler */
  handleFloorHeightChange: ValueChangerFunction;

  /** Building's floor height value in meters */
  floorHeight: number;

  /**Handle after successful upload of GeoJSON doc */
  handleUpload: (data: IData) => void;
}

export interface SliderProps {
  /** Label for the Slider */
  label: string;

  /** unit string to show */
  unit: string;

  /** current slider value from app state */
  value: number;

  /** after Slider on change call this method with updated valuer */
  onChange: ValueChangerFunction;

  /** testID for unit test with testing library */
  testId?: string;

  /** testID for unit test with testing library */
  valueTestId?: string;
}

export interface DisplayPanelProps {
  /** Area of the plot computed value in meter sqr */
  plotArea: number;

  /** Area of the plot computed value in meter sqr */
  buildingArea: number;

  /** Area of the building's total floors computed value in meter sqr */
  buildingFloorArea: number;

  /** Height of the building computed value in meter */
  buildingHeight: number;

  /** Volume of the building computed value in cubic meter */
  volume: number;
}

export interface DisplayProps {
  /** Label for the display results */
  label: string;

  /** Unit for the display results */
  unit: string;

  /** Value for the display results */
  value: number;

  /** Super string (m2) for the display results */
  sup?: string;

  /** testID for react testing tools */
  valueTestID?: string;

  /**  Fraction digits to display better number format for the results */
  fractionDigits?: number;
}

export interface UploadProps {
  /** Handler function after upload the `.geojson` doc */
  handleFileUpload: DataUploaderFunction;
}
