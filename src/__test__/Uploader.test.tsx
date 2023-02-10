import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Uploader from "@/components/Uploader";

describe("<Uploader> Component", () => {
  test("Should render without issue", async () => {
    const handleUpload = jest.fn();
    render(<Uploader handleFileUpload={handleUpload} />);
    const value = await screen.findByTestId("file-uploader");
    expect(value).toHaveTextContent("Click to upload .geojson");
  });

  test("Should upload and parse", async () => {
    const handleUpload = jest.fn();
    render(<Uploader handleFileUpload={handleUpload} />);
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const input = await screen.findByTestId("file-input");
    const file = new File(['{"foo": "bar"}'], "ping.geojson", {
      type: "application/json",
    });
    Object.defineProperty(input, "files", {
      value: [file],
    });
    fireEvent.drop(input);
    const name = await screen.findByTestId("file-name");
    expect(name).toHaveTextContent("ping.geojson");
  });
});
