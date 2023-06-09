import React from "react";
import Cropper from "react-easy-crop";
import { Slider, Button, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import getCroppedImg, { generateDownload } from "../utils/CropImage";
import { SnackbarContext } from "./Snackbar";
import { dataURLtoFile } from "../utils/DataToUrlFile";
import "../../styles/profile/Cropper.css" 

export default function RenderCropper({ handleCropper }) {
  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const setStateSnackbarContext = React.useContext(SnackbarContext);

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    if (!image)
      return setStateSnackbarContext(
        true,
        "Please select an image!",
        "warning"
      );

    generateDownload(image, croppedArea);
  };

  const onClear = () => {
    if (!image)
      return setStateSnackbarContext(
        true,
        "Please select an image!",
        "warning"
      );

    setImage(null);
  };

  const onUpload = async () => {
    if (!image)
      return setStateSnackbarContext(
        true,
        "Please select an image!",
        "warning"
      );

    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      "cropped-image.jpeg"
    );
    console.log(convertedUrlToFile);
  };

  return (
    <div className="container">
      <IconButton
        onClick={handleCropper}
        style={{ background: "white", borderRadius: "15px", color: "red" }}
      >
        <CancelIcon />
      </IconButton>

      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
                color="secondary"
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="container-buttons">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />

        <Button
          onClick={() => onClear()}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={triggerFileSelectPopup}
          style={{ marginRight: "10px" }}
        >
          Choose
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onDownload}
          style={{ marginRight: "10px" }}
        >
          Download
        </Button>
        <Button variant="contained" color="secondary" onClick={onUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
}
