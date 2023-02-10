import { Paper } from "@mui/material/";
import { List } from "@mui/material";
import SlideController from "@/components/SlideController";
import Uploader from "@/components/Uploader";
import { ControlPanelProps } from "@/@types";

/**
 * ControlPanel Component
 * @remarks
 * ControlPanel React functional component.
 * @example
 * Showing controls
 * ```
 * <ControlPanel
 *           handleUpload={(data: GeoJSON) => {}}
 *           handlePlotScaleChange={(value: number) => {}}
 *           handleNumberOfFloorChange={(value: number) => {}}
 *           handleFloorHeightChange={(value: number) => {}}
 *           floorHeight={4}
 *           scale={50}
 *           floors={1}
 *         />
 * ```
 * @returns <ControlPanel/>
 */
export default function ControlPanel({
  handlePlotScaleChange,
  handleNumberOfFloorChange,
  handleFloorHeightChange,
  floorHeight,
  scale,
  floors,
  handleUpload,
}: ControlPanelProps) {
  return (
    <Paper
      sx={{ p: 2, zIndex: 99, position: "absolute", left: 20, width: 300 }}
    >
      <List>
        <SlideController
          valueTestId={"scale_value"}
          testId={"scale_slider"}
          label={"Plot Coverage"}
          onChange={handlePlotScaleChange}
          value={scale}
          unit={"%"}
        />
        <SlideController
          valueTestId={"floor_value"}
          testId={"floor_slider"}
          label={"Number of Floors"}
          onChange={handleNumberOfFloorChange}
          value={floors}
          unit={""}
        />
        <SlideController
          valueTestId={"height_value"}
          testId={"height_slider"}
          label={"Floor Height"}
          onChange={handleFloorHeightChange}
          value={floorHeight}
          unit={"m"}
        />
      </List>
      <Uploader handleFileUpload={handleUpload} />
    </Paper>
  );
}
