import { ListItem } from "@mui/material/";
import styles from "@/styles/Home.module.css";
import { DisplayProps } from "@/@types";

/**
 * Display Component
 * @remarks
 * Display React functional component, to display each reports in DisplayPanel.
 * @example
 * rendering number of floors:
 * ```
 * <Display value={1} unit='' label='Number of Floors'>
 * ```
 * @returns <Display/>
 */
export default function Display({
  value,
  unit,
  label,
  sup = "",
  valueTestID = "value",
  fractionDigits = 2,
}: DisplayProps) {
  return (
    <ListItem alignItems="flex-start">
      <div className={styles.listItem}>
        <div className={styles.sliderLabel}>{label}</div>
        <div>
          <span className={styles.displayValue} data-testid={valueTestID}>
            {value.toFixed(fractionDigits)}{" "}
          </span>
          <span className={styles.displayUnit}>
            {unit}
            <sup>{sup}</sup>
          </span>
        </div>
      </div>
    </ListItem>
  );
}
