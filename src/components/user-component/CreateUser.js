import * as React from "react";
import {useState}  from "react";
import {Box, Button,Dialog,DialogActions, DialogContent,InputAdornment,DialogTitle,FormControl, Select,MenuItem , InputLabel, TextField, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { ToastErrMsg } from "../utils/ToastMsg";
import axios from "axios";
export default function CreateUser({ get }) {
  const [open, setOpen] = React.useState(false);
  const [ibutton, setIbutton] = useState(null);
  // this is inside create user button close  button
  const handleClose = () => {
    setOpen(false);
   
  };
  // this is for user list create user button
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleIclose = () => {
    setIbutton(null);
  };
  const handleIopen = (e) => {
    setIbutton(e.currentTarget);
  };

  const openI = Boolean(ibutton);
  const id = openI ? "simple-popover" : undefined;

  const [createUserData, setcreateUserData] = React.useState({
    first_name: "",
    last_name: "",
    email_id: "",
    contact_no: "",
    password: "",
    role: "2784c79c-1f55-46ba-a2a4-eb13b5d8e983",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcreateUserData({
      ...createUserData,
      [name]: value,
    });
  };
 

  // validating the email entered is in right format or not
  function Validate() {
    //validating
    

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //for email

    const phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const passw =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;

   

    {
      if (createUserData.first_name.trim().length === 0) {
        ToastErrMsg("Please the Enter First name");
        return false;  
      }
      if (
        !createUserData.email_id ||
        regex.test(createUserData.email_id) === false
      ) {
        ToastErrMsg("Please enter the Email-Id");
        return false;
      }
      // else{

      if (!createUserData.role) {
        ToastErrMsg("Please the Choose Role");
        return false;
      }

      if (
        !createUserData.password ||
        passw.test(createUserData.password) === false
      ) {
        ToastErrMsg("Password criteria does not match");
        return false;
      } else {
        if (
          !createUserData.contact_no ||
          phoneNum.test(createUserData.contact_no) === false
        ) {
          ToastErrMsg("Please enter the phone number");
          return false;
        }

        store();
        handleClose();
        return true;
      }
    }
  }
 

  const data = [
    {
      id: "cf36a1d8-89f6-457e-a259-b09659a02312",
      role: "Super_Admin",
    },
    {
      id: "4b2ae150-4d37-4ec5-a265-c4e044df461f",
      role: "Admin",
    },
    {
      id: "6486286a-42c0-4fb1-9143-bb03a638578e",
      role: "Seller",
    },
    {
      id: "2784c79c-1f55-46ba-a2a4-eb13b5d8e983",
      role: "Transporter",
    },
    {
      id: "acca626f-3c0b-4a45-86ae-d2673e5fa29c",
      role: "Shipping_Line",
    },
  ];

  // this is a function which is given on create user button inside create user pop-up
  // on clicking create user this function will get called checking the if else cond and posting data to server
  const store = async (e) => {
    const response = await
    axios
    .post("https://backend-ai-postgres.herokuapp.com/user", createUserData)
    .then(function (response) {
      console.log(response.data);
 
    })
    .catch(function (error) {
      console.log(error);
    });
  };
 

  return (
    <React.Fragment>
      <Button
        variant="contained"
        style={{
          width: "130px",
          height: "50px",
          marginRight: "20px",
        }}
        onClick={handleClickOpen}
      >
        Create User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Create User
          <CloseIcon onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 2, width: "45ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                variant="outlined"
                label="Firstname"
                name="first_name"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Lastname"
                name="last_name"
                onChange={handleChange}
              />
              <TextField
                required
                variant="outlined"
                label="E-mail"
                helperText="Email ID entered here will be the username"
                name="email_id"
                onChange={handleChange}
              />
      
              <FormControl>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="role"
                  name="role"
                  onChange={handleChange}
                >
                  {data.map((e) => (
                    <MenuItem value={e.id}>{e.role}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                id="outlined-password-input"
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoIcon aria-describedby={id} onClick={handleIopen} />
                    </InputAdornment>
                  ),
                }}
                name="password"
                onChange={handleChange}
              />
              <Popover
                id={id}
                open={openI}
                ibutton={ibutton}
                onClose={handleIclose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Box>
                  <CloseIcon
                    sx={{ marginLeft: "540px" }}
                    onClick={handleIclose}
                  />
                  <ul style={{ margin: "20px" }}>
                    <h4>Password criteria should be as below:</h4>
                    <li>Should contain at least 6 characters</li>
                    <li>Should be alphanumeric</li>
                    <li>Should contain at least one special character</li>
                    <li>Should contain one letter in caps</li>
                    <li>
                      Should have a maximum character limit of 15 characters
                    </li>
                  </ul>
                </Box>
              </Popover>

              <TextField
                required
                variant="outlined"
                label="Contact Number"
                name="contact_no"
                type={"number"}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              Validate();
              console.log("validate", createUserData);
            }}

            // disabled={disabledValue}
          >
            Create User
          </Button>
          {/* <Button variant="contained" onClick={handleClose}>
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

 