import { useState, useMemo, useCallback } from "react";
import {
  getRGB,
  getAreOfThePlot,
  getFloors,
  getTransformedPlot,
  getCenterOfThePlot,
} from "../helper/utils";
import { MultiPolygon } from "@turf/turf";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { FlyToInterpolator, MapViewState } from "@deck.gl/core/typed";
import { PathStyleExtension } from "@deck.gl/extensions/typed";
import { ValueChangerFunction, IData, UsePlotFunction } from "@/@types";
const INITIAL_VIEW_STATE = {
  longitude: 6.610821795,
  latitude: 46.515356291,
  zoom: 18,
  bearing: 9,
  pitch: 90,
};

/**
 * React custom hook usePlot
 * @remarks Custom hook usePlot, this is the main hook for the application. Takes no params. and returns `UsePlotReturnType`
 */
const usePlot: UsePlotFunction = () => {
  const [floors, setFloors] = useState<number>(1);
  const [floorHeight, setFloorHeight] = useState<number>(4);
  const [plotScale, setPlotScale] = useState<number>(50);
  const [initialPlot, setInitialPlot] = useState<IData | MultiPolygon | null>(
    null
  );
  const [updatedPlots, setPlots] = useState<Array<IData | MultiPolygon>>([]);

  /** DeckGL's map view state, updates when new doc uploaded  */
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

  /**
   * Callback runs after successful upload of the `GeoJSON` file. Using the json formatted data to update applications state with map location and initial plot.
   * @param data - GeoJSON | IData
   */
  const handleDataUpload = useCallback(
    (data: IData) => {
      const center = getCenterOfThePlot(data);
      setViewState({
        zoom: 18,
        bearing: 9,
        pitch: 90,
        longitude: center.geometry.coordinates[0],
        latitude: center.geometry.coordinates[1],
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
      });
      const feature = getTransformedPlot(data, plotScale);
      setInitialPlot(data);
      setPlots(getFloors(feature.geometry, floors, floorHeight));
    },
    [floorHeight, floors, plotScale]
  );
  /**
   * Handles the number of floors slider change and update the plots and current `floors` state
   * @param value - number from slider's current value
   */
  const handleNumberOfFloorChange = useCallback<ValueChangerFunction>(
    (value: number) => {
      if (Array.isArray(updatedPlots) && updatedPlots.length) {
        const _floors = value;
        setPlots(getFloors(updatedPlots[0], _floors as number, floorHeight));
        setFloors(_floors as number);
      }
    },
    [floorHeight, updatedPlots]
  );
  /**
   * Handles the floor height slider change and update the plots and current `floorHeight` state
   * @param value - number from slider's current value
   */
  const handleFloorHeightChange = useCallback<ValueChangerFunction>(
    (value: number) => {
      if (Array.isArray(updatedPlots) && updatedPlots.length) {
        const _floorHeight = value;
        setPlots(getFloors(updatedPlots[0], floors, _floorHeight as number));
        setFloorHeight(_floorHeight as number);
      }
    },
    [floors, updatedPlots]
  );

  /**
   * Handles the plot scale value slider change and update the plots and current scale factor in percentage
   * @param value - number from slider's current value
   */
  const handlePlotScaleChange = useCallback<ValueChangerFunction>(
    (value: number) => {
      if (initialPlot) {
        const _plotScale = value;
        const feature = getTransformedPlot(initialPlot, _plotScale as number);
        setPlots(getFloors(feature.geometry, floors, floorHeight));
        setPlotScale(_plotScale as number);
      }
    },
    [initialPlot, floors, floorHeight]
  );

  /**
   * Computed layers value, updated when one of the dependency updated
   */
  const layers = useMemo(
    () => [
      new GeoJsonLayer({
        id: `base-plot`,
        opacity: 1,
        data: initialPlot as MultiPolygon & string,
        stroked: true,
        filled: true,
        extruded: false,
        getDashArray: [5, 2],
        dashJustified: true,
        extensions: [new PathStyleExtension({ dash: true })],
        wireframe: true,
        getFillColor: [245, 245, 245],
        getLineColor: [180, 180, 180],
        getLineWidth: 0.5,
        getElevation: 1,
      }),
      ...updatedPlots.map(
        (p, i) =>
          new GeoJsonLayer({
            id: `${i}-poly-2`,
            opacity: 1,
            data: p as MultiPolygon & string,
            stroked: true,
            filled: true,
            extruded: true,
            wireframe: true,
            getFillColor: getRGB(i),
            getElevation: floorHeight,
          })
      ),
    ],
    [floorHeight, initialPlot, updatedPlots]
  );
  /**
   * Computed plotArea value, updates when`updatedPlots` state changes
   */
  const plotArea = useMemo<number>(
    () => (initialPlot ? getAreOfThePlot(initialPlot) : 0),
    [initialPlot]
  );

  /**
   * Computed buildingFloorArea value, updates when`updatedPlots` state changes
   */
  const buildingFloorArea = useMemo<number>(
    () =>
      Array.isArray(updatedPlots) && updatedPlots.length
        ? getAreOfThePlot(updatedPlots[0])
        : 0,
    [updatedPlots]
  );

  /**
   * Computed buildingArea value, updates when`updatedPlots` state changes
   */
  const buildingArea = useMemo<number>(
    () =>
      Array.isArray(updatedPlots) && updatedPlots.length
        ? getAreOfThePlot(updatedPlots[0]) * updatedPlots.length
        : 0,
    [updatedPlots]
  );

  /**
   * Computed volume value, updates when`updatedPlots` or `floorHeight`  state changes
   */
  const volume = useMemo<number>(
    () =>
      Array.isArray(updatedPlots) && updatedPlots.length
        ? getAreOfThePlot(updatedPlots[0]) * updatedPlots.length * floorHeight
        : 0,
    [updatedPlots, floorHeight]
  );

  /**
   * Computed volume value, updates when`updatedPlots` or `floorHeight`  state changes
   */
  const buildingHeight = useMemo<number>(
    () =>
      Array.isArray(updatedPlots) && updatedPlots.length
        ? updatedPlots.length * floorHeight
        : 0,
    [updatedPlots, floorHeight]
  );

  return {
    handleDataUpload,
    handleFloorHeightChange,
    handleNumberOfFloorChange,
    handlePlotScaleChange,
    plotArea,
    buildingArea,
    buildingFloorArea,
    buildingHeight,
    volume,
    layers,
    floors,
    floorHeight,
    plotScale,
    viewState,
  };
};

export { usePlot };
