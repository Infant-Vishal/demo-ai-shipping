import * as React from "react";
import { MenuItem, Menu, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOrderDialog from "./EditOrder";
import AlertPopup from "../utils/AlertPopup";

export default function ActionMenu(props) {
  //Getting Props
  const { selectedRowDetails } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //edit order popup
  const [openEditOrderPopup, setOpenEditOrderPopup] = React.useState(false);

  // cancel order alert
  const [openCancelOrderPopup, setOpenCancelOrderPopup] = React.useState(false);

  //delete order alert

  const [openDeleteOrderPopup, setOpenDeleteOrderPopup] = React.useState(false);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setOpenEditOrderPopup(true);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenCancelOrderPopup(true);
          }}
        >
          Cancel
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteOrderPopup(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {openEditOrderPopup ? (
        <EditOrderDialog
          selectedRowDetails={selectedRowDetails}
          openEditOrderPopup={openEditOrderPopup}
          setOpenEditOrderPopup={setOpenEditOrderPopup}
        />
      ) : null}
      {openDeleteOrderPopup ? (
        <AlertPopup
          selectedRowDetails={selectedRowDetails}
          openAlertPopup={openDeleteOrderPopup}
          setOpenAlertPopup={setOpenDeleteOrderPopup}
          apiContent={"order/deleteOrder"}
          dialogTitle={"Delete Order"}
          dialogContentText={`Do u really want to delete the order?`}
        />
      ) : null}
      {openCancelOrderPopup ? (
        <AlertPopup
          selectedRowDetails={selectedRowDetails}
          openAlertPopup={openCancelOrderPopup}
          setOpenAlertPopup={setOpenCancelOrderPopup}
          apiContent={"order/cancelOrder"}
          dialogTitle={"Cancel Order"}
          dialogContentText={`Do u really want to cancel the order?`}
        />
      ) : null}
    </div>
  );
}
