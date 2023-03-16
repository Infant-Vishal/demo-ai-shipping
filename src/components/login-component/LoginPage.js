import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { ToastErrMsg } from "../utils/ToastMsg";
import "../../styles/login/Login.css";

const Login = () => {
  const paperStyle = {
    padding: 50,
    height: "auto",
    width: 500,
  };
  const avatarStyle = { backgroundColor: "#1976D2" };
  const btnstyle = { margin: "8px o" };
  const [signInData, setSignInData] = useState({});
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
    const response = await axios
      .post(`https://backend-ai-postgres.herokuapp.com/login`, signInData)
      .then((response) => {
        console.log("response from backend", response);
        localStorage.setItem("userLoggedLocal", true);
        localStorage.setItem(
          "userLoggedRole",
          response.data.user.role.role_name
        );
        localStorage.setItem("jwt", response.data.token);
        if (response.data.user.status === 1) {
          navigate("/superadmin/dashboard");
        }
      })
      .then((res) => {
        const userLoggedLocalItem = localStorage.getItem("userLoggedLocal");
        const userLoggedRole = localStorage.getItem("userLoggedRole");
        console.log(
          "logindata..........",
          userLoggedLocalItem,
          "=>",
          userLoggedRole
        );
      })
      .catch((err) => {
        ToastErrMsg("Credentials are incorrect");
      });
  };

  return (
    <div>
      {/*Toast */}
      <ToastContainer />
      <div className="Card">
        <Grid>
          <Paper className="paper" elevation={10} style={paperStyle}>
            <form>
              <Grid align="center">
                <Avatar style={avatarStyle}>
                  <AccountCircleOutlinedIcon />
                </Avatar>
                <h3 className="title">Login</h3>
              </Grid>
              <br />
              <TextField
                id="outlined-basic"
                name="email"
                label="Username"
                variant="outlined"
                type="email"
                fullWidth
                onChange={handleChange}
                // value={signInData.userName}
                error={false}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={handleChange}
                // value={signInData.password}
                error={false}
              />

              <FormControlLabel
                control={<Checkbox name="checked" color="primary" />}
                label="Remember me "
              />

              <Button
                variant="contained"
                type="Submit"
                style={btnstyle}
                fullWidth
                onClick={handleSubmit}
              >
                Sign in{" "}
              </Button>

              <br />
              <br />
              <Grid align="center">
                <nav>
                  <Typography>
                    <Link to="/forgot_password">Recover your password</Link>
                  </Typography>
                </nav>
                <br />
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
