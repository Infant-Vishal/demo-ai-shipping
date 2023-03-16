import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastErrMsg, ToastSuccessMsg } from "../utils/ToastMsg";
import { isValidPwd } from "../utils/Validations";
import "../../styles/update-new-password/UpdateNewPassword.css";

const UpdateNewPassword = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwt"); //getting jwt token
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: "",
  });
  const [currentPasswordSuccessMessage, setCurrentPasswordSuccessMessage] =
    useState(""); // current password success message after validation

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // checking current password is right or wrong
  const handleValidateCurrentPassword = (event) => {
    setValues({ ...values, currentPassword: event.target.value });
    axios
      .post(
        "https://backend-ai-postgres.herokuapp.com/check-password",
        values,
        {
          headers: {
            auth: jwtToken,
          },
        }
      )
      .then(function (response) {
        setCurrentPasswordSuccessMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.statusText === "Unauthorized") {
          ToastErrMsg("Your current password is incorrect. Please try again.");
        }
      });
  };

  const handleClickShowPassword = (fieldName) => {
    setValues({
      ...values,
      showPassword: fieldName === values.showPassword ? "" : fieldName,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    const validatePwd = isValidPwd(values.newPassword);
    if (validatePwd === true && values.confirmPassword === values.newPassword) {
      ToastSuccessMsg("Password has been updated successfully");

      axios
        .put(
          "https://backend-ai-postgres.herokuapp.com/change-password",
          values,
          {
            headers: {
              auth: jwtToken,
            },
          }
        )
        .then(function (response) {
          if (
            response.data.message === "Your password is successfully changed"
          ) {
            navigate("/superadmin/dashboard");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      if (!validatePwd) {
        ToastErrMsg(
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        );
      }
      if (values.confirmPassword !== values.newPassword) {
        ToastErrMsg(
          "Confirm New Password entered does not match with the New Password entered. Please check."
        );
      }
    }
  };

  return (
    <div className="update-new-password-main-container">
      {/*Toast */}
      <ToastContainer />
      <div
        className="update-new-password-card"
        style={{
          display: currentPasswordSuccessMessage === "" ? "block" : "none",
        }}
      >
        <h4>Update New Password</h4>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="current-password">Current Password</InputLabel>
          <OutlinedInput
            id="current-password"
            type={
              values.showPassword === "currentPassword" ? "text" : "password"
            }
            value={values.currentPassword}
            onChange={handleChange("currentPassword")}
            label="Current Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("currentPassword")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword === "currentPassword" ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: "16px" }}
          type="Submit"
          onClick={handleValidateCurrentPassword}
        >
          Next
        </Button>
      </div>
      {/* New password and confirm password */}

      <div
        className="update-new-password-card"
        style={{
          display: currentPasswordSuccessMessage === "" ? "none" : "block",
        }}
      >
        <h4>Update New Password</h4>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="new-password">New Password</InputLabel>
          <OutlinedInput
            id="new-password"
            name="newPassword"
            type={values.showPassword === "newPassword" ? "text" : "password"}
            value={values.newPassword}
            onChange={handleChange("newPassword")}
            label="New Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("newPassword")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword === "newPassword" ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <br />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirm-password"
            name="confirmPassword"
            type={
              values.showPassword === "confirmPassword" ? "text" : "password"
            }
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            label="Confirm Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("confirmPassword")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword === "confirmPassword" ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: "16px" }}
          onClick={handleSubmit}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default UpdateNewPassword;
