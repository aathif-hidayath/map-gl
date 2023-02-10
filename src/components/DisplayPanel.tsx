import { Paper, List } from "@mui/material/";
import Display from "@/components/Display";
import { DisplayPanelProps } from "@/@types";

/**
 * DisplayPanel Component
 * @remarks
 * DisplayPanel React functional component. Display multiple computed values.
 * @example
 * Showing controls
 * ```
 * <DisplayPanel
 *           buildingArea={4500.9897}
 *           buildingFloorArea={2250.5787}
 *           buildingHeight={8}
 *           volume={400890.6548}
 *           plotArea={6900.5648}
 *         />
 * ```
 * @returns <DisplayPanel/>
 */
export default function DisplayPanel({
  plotArea,
  buildingArea,
  buildingFloorArea,
  volume,
  buildingHeight,
}: DisplayPanelProps) {
  return (
    <Paper
      sx={{ p: 2, zIndex: 99, position: "absolute", right: 20, width: 300 }}
    >
      <List data-testid={"display-panel"}>
        <Display
          valueTestID={"v-1"}
          label="Land Area"
          unit={"m"}
          sup={"2"}
          value={plotArea}
        />
        <Display
          valueTestID={"v-2"}
          label="Building Area"
          unit={"m"}
          sup={"2"}
          value={buildingArea}
        />
        <Display
          valueTestID={"v-3"}
          label="Building Floor Area"
          unit={"m"}
          sup={"2"}
          value={buildingFloorArea}
        />
        <Display
          valueTestID={"v-4"}
          label="Building Volume"
          unit={"m"}
          sup={"3"}
          value={volume}
        />
        <Display
          valueTestID={"v-5"}
          label="Building Height"
          unit={"m"}
          fractionDigits={1}
          value={buildingHeight}
        />
      </List>
    </Paper>
  );
}
