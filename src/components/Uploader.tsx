import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { ListItem, ListItemAvatar } from "@mui/material/";
import styles from "@/styles/Home.module.css";
import { UploadProps } from "@/@types/";

/**
 * Uploader Component
 * @remarks
 * Uploader React functional component. component to upload `GeoJSON` docs.
 * @example
 * rendering number of floors:
 * ```
 * <Uploader handleFileUpload={(data: GeoJSON) =>{}} />
 * ```
 * @returns <Uploader/>
 */
export default function Uploader({ handleFileUpload }: UploadProps) {
  const [name, setName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (Array.isArray(acceptedFiles) && acceptedFiles.length) {
        const reader = new FileReader();
        reader.readAsBinaryString(acceptedFiles[0]);
        reader.addEventListener("load", function (e) {
          if (e.target) {
            try {
              setName(acceptedFiles[0].name);
              const data = JSON.parse(`${e.target.result}`);
              handleFileUpload(data);
            } catch (e) {
              /* istanbul ignore next */
              console.log(e);
            }
          }
        });
      }
    },
    [handleFileUpload]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/json": [".json", ".geojson"] },
  });
  return (
    <div data-testid={"file-uploader"}>
      <div {...getRootProps()} style={{ cursor: "pointer" }}>
        <input {...getInputProps()} data-testid={"file-input"} />
        <ListItem>
          <ListItemAvatar>
            <DataObjectIcon />
          </ListItemAvatar>
          <div className={styles.listItem}>
            <p className={styles.label}>Click to upload .geojson</p>
            {name && (
              <span data-testid={"file-name"} className={styles.displayUnit}>
                {name}
              </span>
            )}
          </div>
        </ListItem>
      </div>
    </div>
  );
}
