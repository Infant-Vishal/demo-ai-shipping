import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "../../styles/login/Login.css";
import "../../styles/login/Otp.css";
import { ToastErrMsg } from "../utils/ToastMsg";

const Otp = (props) => {
  const location = useLocation();

  const navigate = useNavigate();

  const paperStyle = {
    padding: 50,
    height: "auto",
    width: 500,
  };

  const avatarStyle = { backgroundColor: "#1976D2" };
  const btnstyle = { margin: "8px o" };

  const [signInData, setSignInData] = useState({ email: location.state.email });
  let buttonStatus = false;

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    let email;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signInData);
    console.log(location.state);
    try {
      const response = await axios.post(
        `https://backend-ai-postgres.herokuapp.com/verify-otp`,
        signInData
      );
      toast.success(response.data, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeOutFeature(navigateFunc, 3000);
      function navigateFunc() {
        navigate("/update_password", { state: location.state });
      }
    } catch (err) {
      ToastErrMsg("Please enter the valid otp");
    }
  };

  let [count, setCount] = useState(150); // seconds
  const [timeOutFeature, setTimeOutFeature] = useState(true);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  function secondsToTime(secs) {
    var minutes = Math.floor((secs / 60) % 60);
    var seconds = Math.ceil(secs % 60);
    return {
      m: minutes,
      s: seconds,
    };
  }
  useEffect(() => {
    if (count >= 0) {
      console.log(timeOutFeature);
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(count);
        setMinute(timeLeftVar.m);
        setSecond(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      setTimeOutFeature(false);
    }
  }, [count]);

  // onclick disable button

  const handleDisableButton = async (e) => {
    setCount(10);
    setTimeOutFeature(true);

    // console.log(props.emailid);
    console.log(signInData);
    console.log(location.state.email);
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://backend-ai-postgres.herokuapp.com/forgot-password`,
        signInData
      );
      console.log(response);
      navigate("/forgotpassword/otp", { state: { email: signInData } });
    } catch (err) {
      toast.error("Please enter the Resend OTP", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer />

      <div className="Card">
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={{ color: "white", backgroundColor: "red" }}>
                <LockOpenIcon />
              </Avatar>
              <br />
              <h2>OTP</h2>
              <h4 style={{ color: "green" }}></h4>
              <Box color="text.secondary">
                <Typography variant="body2">
                  OTP has been sent to your Mail ID
                </Typography>
              </Box>
            </Grid>
            <br />
            <ValidatorForm onSubmit={handleSubmit}>
              <TextField
                label="Enter 6 Digit OTP"
                onChange={handleChange}
                variant="outlined"
                inputProps={{ maxLength: 6 }}
                name="otp"
                size="small"
                disabled={false}
                type="password"
                fullWidth
                // validators={['required']}
                // errorMessages={['OTP is required']}
                // value={user.fname}
              />
              {/* <ResendOTP handelResendClick={() => alert("Resend clicked")} /> */}
              <br />
              <br />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                VERIFY
              </Button>
            </ValidatorForm>

            <Box mt={3}>
              <Typography fontWeight={500} align="center" color="textSecondary">
                Resend OTP in{" "}
                <span style={{ color: "green" }}>
                  {minute <= 9 ? "0" + minute : minute}:
                  {second <= 9 ? "0" + second : second}
                </span>
              </Typography>
            </Box>

            <Typography align="center">
              {buttonStatus ? (
                <NavLink to="otp" style={{ marginLeft: "5px" }}>
                  {" "}
                  Resend OTP
                </NavLink>
              ) : null}

              <Button
                variant="contained"
                onClick={handleDisableButton}
                disabled={timeOutFeature}
              >
                Resend
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};
export default Otp;
