import { ListItem, ListItemAvatar } from "@mui/material/";
import Slider from "@mui/material/Slider";
import styles from "@/styles/Home.module.css";
import { SliderProps } from "@/@types";

/**
 * SlideController Component
 * @remarks
 * SlideController React functional component.Slider for each changeable number values.
 * @example
 * Showing scale slider
 * ```
 * <SlideController
 *           valueTestId={"scale_value"}
 *           testId={"scale_slider"}
 *           label={"Plot Coverage"}
 *           onChange={(value: number) => {}}
 *           value={50}
 *           unit={"%"}
 *         />
 * ```
 * @returns <SlideController/>
 */

export default function SlideController({
  onChange,
  value,
  label,
  unit,
  testId = "slider",
  valueTestId = "value",
}: SliderProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <span data-testid={valueTestId} className={styles.value}>
          {value}
          {unit}
        </span>
      </ListItemAvatar>
      <div className={styles.listItem}>
        <Slider
          data-testid={testId}
          onChange={(_, v) => onChange(v as number)}
          value={value}
          min={1}
          max={100}
          size="small"
        />
        <span className={styles.sliderLabel}>{label}</span>
      </div>
    </ListItem>
  );
}
