import * as React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import "../../styles/order-management/OrderPopup.css";

export default function CreateOrderDialog(props) {
  const { opencreateOrderPopup, setOpenCreateOrderPopup } = props;

  const [createOrderData, setCreateOrderData] = React.useState({
    product: "",
    client_id: "",
    shipperType: "",
    shipper_id: "",
    user_id: "bc3acd5e-1a15-46d0-970d-823a13560914",
  });
  const [client, setClient] = React.useState([]);
  const [shipper, setShipper] = React.useState([]);
  const [transporter, setTransporter] = React.useState([]);
  
  // Disabling create button
  const disabledValue =
    createOrderData.product !== "" &&
    createOrderData.client_id !== "" &&
    createOrderData.shipperType !== "" &&
    createOrderData.shipper_id !== ""
      ? false
      : true;

  const dropDwonUsers = async () => {
    const client_users =  await axios.get("https://backend-ai-postgres.herokuapp.com/users/clients");
    console.log("Axios => ", client_users);
    await client_users?.data.users.client_users.map(user => {
      setClient(old => [...old, user]);
    });
    await client_users?.data.users.transporter_users.map(user => {
      setTransporter(old => [...old, user]);
    });
    await client_users?.data.users.shipper_users.map(user => {
      setShipper(old => [...old, user]);
    });
  }

  React.useEffect(() => {
    dropDwonUsers();
  }, []); 

  React.useEffect(() => {
    console.log("Order element => ", createOrderData);
  }, [createOrderData]);

  
  const handleClickOpen = () => {
    setOpenCreateOrderPopup(true);
  };

  const handleClose = () => {
    setOpenCreateOrderPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateOrderData({
      ...createOrderData, // Spread Operator
      [name]: value,
    });
  };

  //create order data details which will be sent to backend
  const handleCreateData = () => {
    axios
      .post("https://backend-ai-postgres.herokuapp.com/order", createOrderData)
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
      <Button variant="outlined" onClick={handleClickOpen}></Button>
      <Dialog
        open={opencreateOrderPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="order-popup-title"
          color="primary"
        >
          Create Order
        </DialogTitle>
        <DialogContent>
          <TextField
            id="type-product"
            name="product"
            label="Product"
            onChange={handleChange}
            className="order-popup-textfield"
          />
          {/* Client Email Dropdown */}
          <div>
            <Autocomplete
              disablePortal
              id="outlined-select-client"
              className="order-popup-textfield"
              defaultValue={client.find((v) => v.email_id[0])}
              name="client_id"
              options={client}
              getOptionLabel={(option) => option.email_id}
              onChange={(e, value) => setCreateOrderData({...createOrderData, client_id: value.id})}
              renderInput={(params) => <TextField {...params} label="Client" />}
            />

            {/* <TextField
              id="outlined-select-client"
              select
              name="client_id"
              label="Client"
              value={createOrderData.client_id}
              helperText="Please select the Client Email Id"
              onChange={handleChange}
              className="order-popup-textfield"
            >
              {client.map((option) => (
                <MenuItem
                  key={option.email_id}
                  value={option.id}
                >
                  {option.email_id}
                </MenuItem>
              ))}
            </TextField> */}

          </div>
          {/* Shipper Type Dropdown */}
          <div>
            <TextField
              id="outlined-select-shipper-type"
              select
              name="shipperType"
              label="Shipper Type"
              value={createOrderData.shipperType}
              onChange={handleChange}
              helperText="Please select the Shipper Type"
              className="order-popup-textfield"
            >
              <MenuItem value="Shipper">Shipper</MenuItem>
              <MenuItem value="Transporter">Transporter</MenuItem>
            </TextField>
          </div>
          {createOrderData.shipperType === "Shipper" ? (
            //   Shipper Email Dropdown
            <div>
              <Autocomplete
                disablePortal
                id="outlined-select-shipper"
                className="order-popup-textfield"
                // defaultValue={shipper.find((v) => v.email_id[0])}
                name="shipper_id"
                options={shipper}
                getOptionLabel={(option) => option.email_id}
                onChange={(e, value) => setCreateOrderData({...createOrderData, shipper_id: value.id})}
                renderInput={(params) => <TextField {...params} label="Shipper" />}
              />

              {/* <TextField
                id="outlined-select-shipper"
                select
                name="shipper_id"
                label="Shipper"
                value={createOrderData.shipper_id}
                onChange={handleChange}
                helperText="Please select the Shipper Email Id"
                className="order-popup-textfield"
              >
                {shipper.map((option) => (
                  <MenuItem
                    key={option.email_id}
                    value={option.id}
                  >
                    {option.email_id}
                  </MenuItem>
                ))}
              </TextField> */}
            </div>
          ) : createOrderData.shipperType === "Transporter" ? (
            //   Transporter Email Dropdown
            <div>
              <Autocomplete
                disablePortal
                id="outlined-select-shipper"
                className="order-popup-textfield"
                // defaultValue={transporter.find((v) => v.email_id[0])}
                name="shipper_id"
                options={transporter}
                getOptionLabel={(option) => option.email_id}
                onChange={(e, value) => setCreateOrderData({...createOrderData, shipper_id: value.id})}
                renderInput={(params) => <TextField {...params} label="Shipper" />}
              />

              {/* <TextField
                id="outlined-select-shipper"
                select
                name="shipper_id"
                label="Transporter"
                value={createOrderData.shipper_id}
                onChange={handleChange}
                helperText="Please select the Transporter Email Id"
                className="order-popup-textfield"
              >
                {transporter.map((option) => (
                  <MenuItem
                    key={option.email_id}
                    value={option.id}
                  >
                    {option.email_id}
                  </MenuItem>
                ))}
              </TextField> */}
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleCreateData} disabled={disabledValue}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
