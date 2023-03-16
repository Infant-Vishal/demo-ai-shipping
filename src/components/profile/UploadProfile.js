import Dialog from "@mui/material/Dialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
const axios = require("axios").default;

function UploadProfile({ Status, SetStatus, userId, userImage, userDetails }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const maxNumber = 69;
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(userId);
  async function upload() {
    let formData = new FormData();
    formData.append("file", images[images.length - 1].file);
    const response = await fetch(
      `https://demo-shipping.herokuapp.com/file/upload?user=${userId}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.status == 200) {
      toast.success("Profile Picture Uploaded successfully", {
        position: "bottom-right",
      });
      SetStatus(false);
      setTimeout(() => {
        window.location.reload(true);
      }, [1000]);
    }
  }
  function check() {
    setLoading(true);
    console.log("img", images);
    if (images.length == 0) {
      alert("Please Select New Image");
      setLoading(false);
      return;
    }
    axios
      .get(`https://demo-shipping.herokuapp.com/file/${userId}`)
      .then((res) => {
        if (res.data == "not found") {
          upload();
        } else {
          axios
            .delete(`https://demo-shipping.herokuapp.com/file/${userId}`)
            .then((res) => {
              if ((res.status = 200)) {
                console.log("deleted");
                upload();
              } else {
                toast.error("Somethin went wrong", {
                  position: "bottom-right",
                });
              }
            });
        }
      });
    console.log();
  }

  const onChange = (imageList, addUpdateIndex) => {
    const size = Math.floor(imageList[0].file.size / 1024);
    console.log("image", size);
    if (size > 2000 || size < 2) {
      alert("image size should be between 10 KB to 2 MB");
      return;
    }
    setImages(imageList);
  };
  console.log(images);
  return (
    <>
      <ToastContainer />
      <Dialog open={Status}>
        <div style={{ width: "600px", height: "500px", padding: "5px" }}>
          <div className="header">
            <ArrowBackIcon
              style={{ cursor: "pointer", float: "left" }}
              onClick={() => {
                SetStatus(false);
              }}
            />
            <div className="Dialog_heading">Change Profile Picture</div>
          </div>

          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <div className="middle" {...dragProps}>
                  <Avatar
                    alt="Remy Sharp"
                    style={{ cursor: "pointer" }}
                    className="user_icon"
                    src={
                      images.length > 0
                        ? images[images.length - 1].data_url
                        : userImage
                    }
                    sx={{ width: "200px", height: "200px" }}
                  >
                    {userDetails.First_Name}
                  </Avatar>
                  {/* <img
                    style={{ cursor: "pointer" }}
                    className="user_icon"
                    src={
                      images.length > 0
                        ? images[images.length - 1].data_url
                        : `https://profile-image-upload.herokuapp.com/file/${user}`
                    }
                  /> */}
                  <div className="Drag">Drag Photo Here</div>
                  <hr style={{ width: "300px" }} />
                  <div style={{ marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      component="label"
                      onClick={onImageUpload}
                    >
                      Upload from Computer
                      {/* <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      /> */}
                    </Button>
                  </div>

                  <Button
                    onClick={check}
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                    variant="contained"
                  >
                    {loading ? (
                      <CircularProgress size={26} style={{ color: "white" }} />
                    ) : (
                      "Done"
                    )}
                  </Button>
                </div>
                {/* {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))} */}
              </div>
            )}
          </ImageUploading>
        </div>
      </Dialog>
    </>
  );
}
export default UploadProfile;