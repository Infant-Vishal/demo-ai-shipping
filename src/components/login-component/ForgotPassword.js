import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import { Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/login/Login.css";
import { ToastErrMsg } from "../utils/ToastMsg";
import { ToastContainer } from "react-toastify";

const Forgotpassword = (props) => {
  const paperStyle = {
    padding: 50,
    height: "auto",
    width: 500,
  };
  const avatarStyle = { backgroundColor: "#1976D2" };
  const btnstyle = { margin: "9px 0px" };
  const initialValues = { email: "" };
  const [signInData, setSignInData] = useState(initialValues);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signInData);
    console.log(props.emailid);

    try {
      const response = await axios.post(
        `https://backend-ai-postgres.herokuapp.com/forgot-password`,
        signInData
      );
      console.log(response);
      navigate("/otp", { state: signInData });
    } catch (err) {
      console.error(err);
      ToastErrMsg("Invalid email");
    }
  };
  return (
    <div>
      {/*Toast */}
      <ToastContainer />
      <div className="Card">
        <Grid>
          <Paper className="paper" elevation={10} style={paperStyle}>
            <Grid align="center">
              {" "}
              <Avatar style={avatarStyle}>
                <MailLockOutlinedIcon />
              </Avatar>
              <br />
              <h2>Email ID*</h2>
              <h6>
                Forgotten your password? Enter your email address below and
                we'll email instructions for setting a new one
              </h6>
            </Grid>
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              type={Email}
              fullWidth
              required
              onChange={handleChange}
            />
            <br />
            <br />
            <Button
              variant="contained"
              type="Submit"
              style={btnstyle}
              fullWidth
              onClick={handleSubmit}
            >
              next{" "}
            </Button>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default Forgotpassword;
