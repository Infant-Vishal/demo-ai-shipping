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

export default function EditOrderDialog(props) {
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

  const { openEditOrderPopup, setOpenEditOrderPopup, selectedRowDetails } =
    props;

  const handleClickOpen = () => {
    setOpenEditOrderPopup(true);
  };

  const handleClose = () => {
    setOpenEditOrderPopup(false);
  };

  //storing edited data while changing
  // const [editOrderData, setEditOrderData] = React.useState(selectedRowDetails);
  const prevRowDetails = {
    product: selectedRowDetails.product,
    client_name:
      selectedRowDetails.client.first_name +
      " " +
      selectedRowDetails.client.last_name,
    shipper_name:
      selectedRowDetails.shipper.first_name +
      " " +
      selectedRowDetails.shipper.last_name,
    client_phone: selectedRowDetails.client.contact_no,
    shipper_phone: selectedRowDetails.client.contact_no,
  };
  const [editOrderData, setEditOrderData] = React.useState({
    product: selectedRowDetails.product,
    client_name:
      selectedRowDetails.client.first_name +
      " " +
      selectedRowDetails.client.last_name,
    shipper_name:
      selectedRowDetails.shipper.first_name +
      " " +
      selectedRowDetails.shipper.last_name,
    client_phone: selectedRowDetails.client.contact_no,
    shipper_phone: selectedRowDetails.client.contact_no,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditOrderData({
      ...editOrderData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("equal --->", _.isEqual(prevRowDetails, editOrderData));
    console.log("before request", selectedRowDetails);

    //validations
    if (_.isEqual(prevRowDetails, editOrderData) === true) {
      ToastErrMsg("No changes have been made");
    } else if (editOrderData.client_name === "") {
      ToastErrMsg("Please enter the client name");
    } else if (editOrderData.client_phone == "") {
      ToastErrMsg("Please enter the client phone number");
    } else if (editOrderData.product === "") {
      ToastErrMsg("Please enter the product name");
    } else if (editOrderData.shipper_name === "") {
      ToastErrMsg("Please enter the shipper name");
    } else if (editOrderData.shipper_phone === "") {
      ToastErrMsg("Please enter the shipper phone number");
    } else if (editOrderData.client_phone.length !== 10) {
      ToastErrMsg("Please enter the valid  client phone number");
    } else if (editOrderData.shipper_phone.length !== 10) {
      ToastErrMsg("Please enter the valid shipper phone number");
    } else {
      ToastSuccessMsg("Your changes have been updated");
      selectedRowDetails.product = editOrderData.product;
      selectedRowDetails.client.first_name = editOrderData.client_name;
      selectedRowDetails.client.contact_no = editOrderData.client_phone;
      selectedRowDetails.shipper.first_name = editOrderData.shipper_name;
      selectedRowDetails.shipper.contact_no = editOrderData.shipper_phone;
      console.log("after request", selectedRowDetails);

      //updating to the backend data
      axios
        .put(
          `https://backend-ai-postgres.herokuapp.com/order`,
          selectedRowDetails
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      handleClose();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}></Button>
        <Dialog
          id="edit-order-popup"
          open={openEditOrderPopup}
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
                <TextField
                  id="client-id"
                  label="Client Id"
                  defaultValue={selectedRowDetails.client.id}
                  disabled
                  className="order-popup-textfield"
                />
                <TextField
                  id="client-name"
                  label="Client Name"
                  name="client_name"
                  onChange={handleChange}
                  defaultValue={
                    selectedRowDetails.client.first_name +
                    " " +
                    selectedRowDetails.client.last_name
                  }
                  className="order-popup-textfield"
                  required={true}
                />
                <TextField
                  id="client-email"
                  label="Client Email"
                  defaultValue={selectedRowDetails.client.email_id}
                  disabled
                  className="order-popup-textfield"
                />
                <TextField
                  id="client-phone"
                  label="Client Phone"
                  type="number"
                  name="client_phone"
                  onChange={handleChange}
                  defaultValue={selectedRowDetails.client.contact_no}
                  className="order-popup-textfield"
                  required={true}
                />
                <TextField
                  id="client-company"
                  label="Client Company"
                  name="client_company"
                  onChange={handleChange}
                  defaultValue={selectedRowDetails.client.company}
                  className="order-popup-textfield"
                />
              </div>

              {/*Shipper Details  */}
              <div>
                <TextField
                  id="order-product"
                  label="Product"
                  name="product"
                  onChange={handleChange}
                  defaultValue={selectedRowDetails.product}
                  className="order-popup-textfield"
                  required={true}
                />
                <TextField
                  id="shipper-id"
                  label="Shipper Id"
                  defaultValue={selectedRowDetails.shipper.id}
                  disabled
                  className="order-popup-textfield"
                />
                <TextField
                  id="shipper-name"
                  label="Shipper Name"
                  name="shipper_name"
                  onChange={handleChange}
                  defaultValue={
                    selectedRowDetails.shipper.first_name +
                    " " +
                    selectedRowDetails.shipper.last_name
                  }
                  className="order-popup-textfield"
                  required={true}
                />
                <TextField
                  id="shipper-email"
                  label="Shipper email"
                  defaultValue={selectedRowDetails.shipper.email_id}
                  disabled
                  className="order-popup-textfield"
                />
                <TextField
                  id="shipper-phone"
                  label="Shipper Phone"
                  name="shipper_phone"
                  onChange={handleChange}
                  defaultValue={selectedRowDetails.shipper.contact_no}
                  className="order-popup-textfield"
                  required={true}
                />
                <TextField
                  id="shipper-company"
                  label="Shipper Company"
                  name="shipper_company"
                  onChange={handleChange}
                  defaultValue={selectedRowDetails.shipper.company}
                  className="order-popup-textfield"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Back</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
