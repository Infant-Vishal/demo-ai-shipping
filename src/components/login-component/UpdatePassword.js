import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UpdatepasswordValidation from "./Validation";
import "../../styles/login/Login.css";
import { ToastErrMsg } from "../utils/ToastMsg";

const UpdatePassword = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const paperStyle = {
    padding: 50,
    height: "auto",
    width: 500,
  };
  const avatarStyle = { backgroundColor: "#1976D2" };
  const btnstyle = { margin: "9px o" };
  const [values, setValues] = useState({
    showPassword: true,
    showconfirmpassword: false,
    email: location.state.email,
  });

  const [newPass, setNewPass] = useState(false);
  const [conPass, setConPass] = useState(false);

  const handleSubmit = async (e) => {
    console.log("eee", e);
    console.log(values.email);
    const userData = {
      newPassword: e.newPassword,
      confirmPassword: e.confirmpassword,
      email: values.email,
    };
    console.log(userData);
    try {
      const response = await axios.put(
        `https://backend-ai-postgres.herokuapp.com/reset-password-otp`,
        userData
      );
      console.log(response);
      localStorage.setItem("userLoggedLocal", true);
      navigate("/superadmin/dashboard", { state: location.state });
    } catch (err) {
      ToastErrMsg("Update password is incomplete");
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={{ newPassword: "", confirmpassword: "" }}
        validationSchema={UpdatepasswordValidation}
        validateOnMount={true}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <div className="Card">
            <Grid>
              <Paper className="paper" elevation={10} style={paperStyle}>
                <Grid align="center">
                  {" "}
                  <Avatar style={avatarStyle}>
                    <LockOpenOutlinedIcon />
                  </Avatar>
                  <h2>UpdatePassword</h2>
                </Grid>
                <br />

                <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                  <InputLabel
                    type="password"
                    htmlFor="outlined-adornment-password"
                  >
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={newPass ? "text" : "password"}
                    value={values.newPassword}
                    name="newPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setNewPass(!newPass);
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {!newPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                  <InputLabel
                    type="password"
                    htmlFor="outlined-adornment-password"
                  >
                    Confirmation Password
                  </InputLabel>

                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={conPass ? "text" : "password"}
                    value={values.confirmpassword}
                    name="confirmpassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setConPass(!conPass);
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {!conPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirmation Password"
                  />
                </FormControl>
                <br />
                <br />

                <nav>
                  <Button
                    textDecoration="none"
                    variant="contained"
                    type="Submit"
                    style={btnstyle}
                    onClick={() => {
                      ToastErrMsg(errors.newPassword);
                      ToastErrMsg(errors.confirmpassword);
                      handleSubmit();
                    }}
                    fullWidth
                  >
                    Update
                  </Button>
                </nav>
              </Paper>
            </Grid>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;
