// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

jest.mock("@mui/material/Slider", () => (props) => {
  const { id, name, min, max, onChange } = props;
  return (
    <input
      data-testid={"slider"}
      type="range"
      id={id}
      name={name}
      min={min}
      max={max}
      onChange={(event) => onChange(event.target.value)}
    />
  );
});
