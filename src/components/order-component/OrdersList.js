import React, { useEffect, useState } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Button, Chip, Pagination, TextField } from "@mui/material";
import axios from "axios";
import CreateOrderDialog from "./CreateOrder";
import ViewOrderDialog from "./ViewOrder";
import { ToastContainer } from "react-toastify";
import ActionMenu from "./ActionMenu";
import "../../styles/order-management/Order.css";
import "../../styles/common-styles/Common.css";
import UploadDoc from "./UploadDoc";
import FileUploadIcon from '@mui/icons-material/FileUpload';

// pagination
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      sx={{ margin: "auto" }}
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

// Data Table
export default function OrdersList() {

  // chip declaration
  const nilChip = (
    <Chip label="Not Uploaded" color="error" className="status-chip" />
  );
  const onProcessChip = (
    <Chip
      label="On Process"
      style={{ backgroundColor: "#f5a142" }}
      className="status-chip"
    />
  );
  const uploadChip = (
    <Chip label="Uploaded" color="success" className="status-chip" />
  );

  const [openViewOrderPopup, setOpenViewOrderPopup] = React.useState(false);
  const [opencreateOrderPopup, setOpenCreateOrderPopup] = React.useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = React.useState({});
  const [role, setRole] = React.useState("");
  const [orderListData, setOrderListData] = useState([]);
  const [rows, setRows] = useState([]);

  const [openEditOrderPopup, setOpenEditOrderPopup] = React.useState(false);
  const [openUploadFilePopup, setOpenUploadFilePopup] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setRole(localStorage.getItem("userLoggedRole"));
    axios
      .get("https://backend-ai-postgres.herokuapp.com/orders")
      .then(function (response) {
        setOrderListData(response.data.orders);
        setRows(response.data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // columns
  const columns = [
    {
      field: "order_id",
      headerName: "Order ID",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "product",
      headerName: "Product",
      minWidth: 130,
      flex: 1,
      valueGetter: (params) => params.row.product,
    },
    {
      field: "client_full_name",
      headerName: "Client",
      description: "This column has a value getter and is not sortable.",
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.client.first_name || ""} ${
          params.row.client.last_name || ""
        }`,
    },
    {
      field: "contact_no",
      headerName: "Client Phone",
      sortable: false,
      minWidth: 130,
      flex: 1,
      renderCell: (params) => params.row.client.contact_no,
    },
    {
      field: "shipper_full_name",
      headerName: "Shipper",
      description: "This column has a value getter and is not sortable.",
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.shipper.first_name || ""} ${
          params.row.shipper.last_name || ""
        }`,
    },
    {
      field: "shiper_contact_no",
      headerName: "Shipper Phone",
      sortable: false,
      minWidth: 130,
      flex: 1,
      valueGetter: (params) => params.row.shipper.contact_no,
    },
    // {
    //   field: "shipper_type",
    //   headerName: "Shipper Type",
    //   minWidth: 130,
    //   flex: 1,
    //   valueGetter: (params) => params.row.shipper.shipper_type,
    // },

    {
      field: "clientDocUpload",
      headerName: "Client Doc Upload",
      sortable: false,
      minWidth: 130,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) =>
        params.row.client_doc_upload
          ? params.row.client_doc_upload === "Not Uploaded"
            ? nilChip
            : params.row.client_doc_upload === "On process"
            ? onProcessChip
            : uploadChip
          : null,
    },
    {
      field: "shipperDocUpload",
      headerName: "Shipper Doc Upload",
      sortable: false,
      minWidth: 130,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) =>
        params.row.shipper_doc_upload
          ? params.row.shipper_doc_upload === "Not Uploaded"
            ? nilChip
            : params.row.shipper_doc_upload === "On process"
            ? onProcessChip
            : uploadChip
          : null,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      sortable: false,
      minWidth: 130,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) =>
        params.row.order_status ? (
          params.row.order_status === "Created" ? (
            <Chip
              label={params.row.order_status}
              style={{ backgroundColor: "#FA8072" }}
              className="status-chip"
            />
          ) : params.row.order_status === "Assigned" ? (
            <Chip
              label={params.row.order_status}
              color="primary"
              className="status-chip"
            />
          ) : params.row.order_status === "ShippingInProgress" ? (
            <Chip
              label={params.row.order_status}
              style={{ backgroundColor: "#FFA500" }}
              className="status-chip"
            />
          ) : params.row.order_status === "Delivered" ? (
            <Chip
              label={params.row.order_status}
              color="success"
              className="status-chip"
            />
          ) : params.row.order_status === "Cancelled" ? (
            <Chip
              label={params.row.order_status}
              color="error"
              className="status-chip"
            />
          ) : (
            <Chip
              label={params.row.order_status}
              color="#808080"
              className="status-chip"
            />
          )
        ) : null,
    },
    ...(role === "Super_Admin") ?
    [{
      field: "action",
      headerName: "Action",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return <ActionMenu selectedRowDetails={params.row} />;
      },
    }] : [{
      field: "upload",
      headerName: "Upload",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        // return <UploadDoc selectedRowDetails={params.row}
        //   openEditOrderPopup={true}
        //   // setOpenEditOrderPopup={setOpenEditOrderPopup} 
        // />;

        return (
          // <Button variant="outlined" onClick={()=>{setOpenEditOrderPopup(true)}}>
          //   <UploadDoc selectedRowDetails={params.row}
          //     openEditOrderPopup={openEditOrderPopup}
          //     setOpenEditOrderPopup={setOpenEditOrderPopup} 
          //   />
          // </Button>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={()=>{setOpenUploadFilePopup(true)}}
            >
              <FileUploadIcon />
            </Button>
            {openUploadFilePopup ? <UploadDoc openUploadFilePopup={openUploadFilePopup} setOpenUploadFilePopup={setOpenUploadFilePopup} selectedRowDetails={params.row}/> : null}
          </div>
        );
      },
    }]
  ];

  //  Search
  const requestSearch = (searchedVal) => {
    if (searchedVal !== "") {
      const filteredRows = orderListData?.filter((row) => {
        return row.product.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    } else {
      setRows(orderListData);
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/*Toast */}
      <ToastContainer />
      {/*Header */}
      <div className="order-list-header">
        <h2 className="order-list-heading">Order List</h2>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          className="order-search-bar"
          onChange={(e) => requestSearch(e.target.value)}
        />
        <Button
          variant="contained"
          className="order-add-button"
          onClick={() => {
            setOpenCreateOrderPopup(true);
          }}
        >
          Create Order
        </Button>
      </div>
      {/* Order list table */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        hideFooterSelectedRowCount
        components={{
          Pagination: CustomPagination,
        }}
        onCellClick={(params) => {
          setSelectedRowDetails(params.row);
          if (params.field !== "action" && params.field !== "upload") {
            setOpenViewOrderPopup(true);
          }
        }}
        // onSelectionModelChange={(ids) => {
        //   setid(ids);
        //   setOpenViewOrderPopup(true);
        //   setContent(`Order ${ids} is clicked`);
        // }}
      />
      {/* Popups */}
      {openViewOrderPopup ? (
        <ViewOrderDialog
          selectedRowDetails={selectedRowDetails}
          openViewOrderPopup={openViewOrderPopup}
          setOpenViewOrderPopup={setOpenViewOrderPopup}
        />
      ) : null}
      {opencreateOrderPopup ? (
        <CreateOrderDialog
          opencreateOrderPopup={opencreateOrderPopup}
          setOpenCreateOrderPopup={setOpenCreateOrderPopup}
        />
      ) : null}
    </div>
  );
}
