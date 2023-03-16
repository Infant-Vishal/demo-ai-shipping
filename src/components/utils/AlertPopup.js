import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

export default function AlertPopup(props) {
  const {
    openAlertPopup,
    setOpenAlertPopup,
    selectedRowDetails,
    apiContent,
    dialogTitle,
    dialogContentText,
  } = props;

  console.log("from alert popup", openAlertPopup)

  const handleClickOpen = () => {
    setOpenAlertPopup(true);
  };

  const handleClose = () => {
    setOpenAlertPopup(false);
  };

  const handleFunction = () => {
    const id = selectedRowDetails.id;
    axios
      .put(`https://backend-ai-postgres.herokuapp.com/${apiContent}/${id}`, id)
      .then(function (response) {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });

    handleClose();
  };

  return (
    <div>
      <Dialog
        open={openAlertPopup}
        onClose={handleClose}
        aria-labelledby="responsive-delete-order-title"
        maxWidth={"md"}
      >
        <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFunction}>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
