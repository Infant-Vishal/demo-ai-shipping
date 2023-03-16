import * as React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Paper,
} from "@mui/material";
import EditOrderDialog from "./EditOrder";
import "../../styles/order-management/OrderPopup.css";
import CommentBox from "./CommentBox";

export default function ViewOrderDialog(props) {
  const [openEditOrderPopup, setOpenEditOrderPopup] = React.useState(false);
  const { openViewOrderPopup, setOpenViewOrderPopup, selectedRowDetails } =
    props;

  const handleClickOpen = () => {
    setOpenViewOrderPopup(true);
  };

  const handleClose = () => {
    setOpenViewOrderPopup(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}></Button>
      <Dialog
        id="view-order-popup"
        open={openViewOrderPopup}
        onClose={handleClose}
        aria-labelledby="view-order-dialog-title"
        aria-describedby="view-order-dialog-description"
        maxWidth={"md"}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="order-popup-title"
          color="primary"
        >
          View Order
        </DialogTitle>
        <DialogContent>
          <div className="client-shipper-details-container">
            {/*Client Details */}
            <div>
              <TextField
                id="order-id"
                label="Order Id"
                defaultValue={selectedRowDetails.order_id}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="client-id"
                label="Client Id"
                defaultValue={selectedRowDetails.client.id}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="client-name"
                label="Client Name"
                defaultValue={
                  selectedRowDetails.client.first_name +
                  " " +
                  selectedRowDetails.client.last_name
                }
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="client-email"
                label="Client Email"
                defaultValue={selectedRowDetails.client.email_id}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="client-phone"
                label="Client Phone"
                defaultValue={selectedRowDetails.client.contact_no}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="client-company"
                label="Client Company"
                defaultValue={selectedRowDetails.client.company}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
            </div>

            {/*Shipper Details  */}
            <div>
              <TextField
                id="order-product"
                label="Product"
                defaultValue={selectedRowDetails.product}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="shipper-id"
                label="Shipper Id"
                defaultValue={selectedRowDetails.shipper.id}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="shipper-name"
                label="Shipper Name"
                defaultValue={
                  selectedRowDetails.shipper.first_name +
                  " " +
                  selectedRowDetails.shipper.last_name
                }
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="shipper-email"
                label="Shipper email"
                defaultValue={selectedRowDetails.shipper.email_id}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="shipper-phone"
                label="Shipper Phone"
                defaultValue={selectedRowDetails.shipper.contact_no}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
              <TextField
                id="shipper-company"
                label="Shipper Company"
                defaultValue={selectedRowDetails.shipper.company}
                InputProps={{
                  readOnly: true,
                }}
                className="order-popup-textfield"
              />
            </div>
          </div>
        </DialogContent>
        <Paper style={{ maxHeight: 100, overflow: "auto" }}>
          <CommentBox />
        </Paper>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenEditOrderPopup(true);
            }}
          >
            Edit
          </Button>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
      {openEditOrderPopup ? (
        <EditOrderDialog
          selectedRowDetails={selectedRowDetails}
          openEditOrderPopup={openEditOrderPopup}
          setOpenEditOrderPopup={setOpenEditOrderPopup}
        />
      ) : null}
    </div>
  );
}
