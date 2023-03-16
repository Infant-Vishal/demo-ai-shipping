import "../../styles/profile/Profile.css";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import UploadProfile from "./UploadProfile";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const axios = require("axios").default;
function Profile() {
  const [status, setStatus] = useState(false);
  const [userImage, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [delLoad, setDelLoad] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  // const [edit, setEdit] = useState(true);
  const [First_Name, setFirstName] = useState("");
  const [Last_Name, setLastName] = useState("");
  const [editLoad, setEditLoad] = useState(false);

  function getAdmin() {
    axios
      .get(
        "https://demo-shipping.herokuapp.com/adminUser/in.ent.common.123@gmail.com"
      )
      .then((res) => {

        setUserDetails(res.data);
        setFirstName(res.data.First_Name);
        setLastName(res.data.Last_Name);
        ImageFetch(res.data._id);
      });
  }
  // console.log("edit", edit);
  console.log("Admin", userDetails);
  function ImageFetch(e) {
    axios
      .get(`https://demo-shipping.herokuapp.com/file/${e}`)
      .then(function (res) {
        console.log("Image", res);
        setLoading(false);
        if (res.data == "not found") {
          setImage("");
        } else {
          setImage(`https://demo-shipping.herokuapp.com/file/${e}`);
        }
      });
  }

  useEffect(() => {
    getAdmin();
  }, []);

  async function remove() {
    setDelLoad(true);
    if (window.confirm("Are you sure you want to remove the image?")) {
      axios
        .delete(`https://demo-shipping.herokuapp.com/file/${userDetails._id}`)
        .then(function (response) {
          if (response.status == 200) {
            toast.error("Profile Picture Removed successfully", {
              position: "bottom-right",
            });
            setTimeout(() => {
              window.location.reload(true);
            }, [1000]);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  }
  function Update() {
    setEditLoad(true);
    console.log("name", First_Name, Last_Name);
    fetch(
      `https://demo-shipping.herokuapp.com/adminUser/${userDetails._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          First_Name: First_Name,
          Last_Name: Last_Name,
        }),
      }
    ).then((res) => {
      if (res.status == 200) {
        toast.success("Profile Details Updated successfully", {
          position: "bottom-right",
        });
        setTimeout(() => {
          window.location.reload(true);
        }, [1000]);
      }
      console.log(res.status);
    });
  }
  return (
    <>
      {loading ? (
        <div id="loading">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <ToastContainer />
          <div className="container">
            <div className="left_box">
              <div className="profile_box">
                <div className="Image">
                  <Avatar
                    alt="Remy Sharp"
                    src={userImage ? userImage : ""}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    {userDetails.First_Name}
                  </Avatar>

                  <PhotoCameraIcon
                    fontSize="large"
                    className="camera_icon"
                    onClick={() => {
                      setStatus(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div id="btn">
                {userImage ? (
                  <div>
                    {delLoad ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={remove}
                        style={{ marginLeft: "46px" }}
                      >
                        <CircularProgress
                          size={26}
                          style={{ color: "white" }}
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={remove}
                        style={{ marginLeft: "5px" }}
                      >
                        Remove Image
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setStatus(true);
                    }}
                    style={{ marginLeft: "5px" }}
                  >
                    Upload Image
                  </Button>
                )}
              </div>
            </div>
            <div className="right_box">
              <div id="heading">Profile Details</div>
              <div className="input_boxs">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="User Id"
                    variant="outlined"
                    value={userDetails._id}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Role"
                    variant="outlined"
                    value={userDetails.Role}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    name="First_Name"
                    defaultValue={First_Name}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    name="Last_Name"
                    defaultValue={Last_Name}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email Id"
                    type="email"
                    variant="outlined"
                    value={userDetails.Email_Id}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Mobile Number"
                    type="number"
                    variant="outlined"
                    value={userDetails.Mobile}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Company"
                    variant="outlined"
                    value={userDetails.Company}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    value={userDetails.City}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
              </div>
              <Button
                style={{ margin: "10px" }}
                variant="contained"
                // disabled={edit}
                onClick={Update}
              >
                {editLoad ? (
                  <CircularProgress size={26} style={{ color: "white" }} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
          <UploadProfile
            Status={status}
            SetStatus={setStatus}
            userId={userDetails._id}
            userImage={userImage}
            userDetails={userDetails}
          />
        </div>
      )}
    </>
  );
}
export default Profile;