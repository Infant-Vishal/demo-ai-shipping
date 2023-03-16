import * as React from "react";
import {
  TextField,
  ThemeProvider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  createTheme
} from "@mui/material";
import _ from "lodash";
import axios from "axios";
import { ToastErrMsg, ToastSuccessMsg } from "../utils/ToastMsg";
import "../../styles/order-management/OrderPopup.css";

export default function UploadDoc(props) {
  // asterisk styling

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red" },
        },
      },
    },
  });

  const { selectedRowDetails, openUploadFilePopup, setOpenUploadFilePopup } = props;
  console.log("Rows => ", selectedRowDetails);

  const handleClickOpen = () => {
    setOpenUploadFilePopup(true);
  };

  const handleClose = () => {
    console.log("Click close")
    setOpenUploadFilePopup(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Dialog
          id="edit-order-popup"
          open={openUploadFilePopup}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
        >
          <DialogTitle
            id="alert-dialog-title"
            className="order-popup-title"
            color="primary"
          >
            Edit Order
          </DialogTitle>
          <DialogContent>
            <div className="client-shipper-details-container">
              {/*Client Details */}
              <div>
                <TextField
                  id="order-id"
                  label="Order Id"
                  required
                  defaultValue={selectedRowDetails.order_id}
                  disabled
                  className="order-popup-textfield"
                />

              </div>
            </div>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleSave}>Save</Button> */}
            <Button onClick={handleClose}>Back</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
