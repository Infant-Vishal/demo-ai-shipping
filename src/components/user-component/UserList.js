/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Chip,
  Pagination,
  TextField,
  MenuItem,
  Menu,
  Box,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import MaxWidthDialog from "./ViewUser";
import CreateUser from "./CreateUser";
import "../../styles/user-module/UserList.css";
import "../../styles/common-styles/Common.css";
import AlertPopup from "../utils/AlertPopup";

// User role
const userRole = localStorage.getItem("userLoggedRole");

// chip declaration
const userActive = (
  <Chip label="Active" color="success" className="status-chip" />
);
const userSuspend = (
  <Chip label="Suspend" color="error" className="status-chip" />
);

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

function UserList(props) {
  //Getting Props
  const { selectedRowDetails } = props;

  const [rows, setRows] = useState([]); //this is for user list table containing whole data fetched from API
  const [temporaryrow, setTemporaryrow] = useState([]); // this is for temporaryrow of active and suspend
  const [statusViewPopup, setStatusViewPopup] = useState(false); //setting statusViewPopup to active or suspend
  const [editScreen, setEditScreen] = useState(false);
  const [suspend, setSuspend] = React.useState(true); //changing suspend button to re-activate and vice-versa
  const [anchorEl, setAnchorEl] = useState(null);
  const [delUser, setDelUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusdropdown, setStatusdropdown] = React.useState("");
  const [buttonStatus, setButtonStatus] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [openDeleteUserPopup, setOpenDeleteUserPopup] = React.useState(false);

  // const userRole = localStorage.getItem("userLoggedRole");

  const handlesearchbox = () => {
    setClicked(true);
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    searchFilter(searchText); //this function is fetching user data
  }, [searchText]);

  async function get() {
    const res = await fetch(`https://backend-ai-postgres.herokuapp.com/users`);
    const data = await res.json();
    const arr = await data.Users.filter((e) => {
      return e.user_status != "Deactivate";
    });
    setRows(arr);
    setTemporaryrow(arr);
  }

  const searchFilter = (el) => {
    //filter is a godfather
    if (el.length >= 2) {
      const arr = rows.filter((e) => {
        if (
          e.first_name[0].toLowerCase() == el[0].toLowerCase() ||
          (e.first_name[0].toLowerCase() == el[0].toLowerCase() &&
            e.first_name[1].toLowerCase() == el[1].toLowerCase()) ||
          e.first_name[0].toLowerCase() == el[1].toLowerCase()
        ) {
          return e.first_name; // big game
        }
        if (e.last_name[0] == el[0] && e.last_name[1] == el[1]) {
          return e.first_name;
        }
        if (e.email_id[0] == el[0] && e.email_id[1] == el[1]) {
          return e.email_id;
        }
        if (e.id[0] == el[0] && e.id[1] == el[1]) {
          return e.id;
        }
      });
      setTemporaryrow(arr);
    } else {
      setTemporaryrow(rows);
    }
  };

  // this is for showing the status:-
  function Statusfilter(el) {
    if (el === "All") {
      // el = status
      return setTemporaryrow(rows);
    }
    const newData = rows.filter((e) => {
      return e.user_status === el;
    });
    setTemporaryrow(newData);
  }
  const handleStatusdropdown = (e) => {
    setStatusdropdown(e.target.value);
  };

  function toogleStatus() {
    setStatusViewPopup(false);
  }
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null); //helping in closing the pop-up's by clicking on anywhere
  };

  //patch function for updating status of user i.e. active,suspend

  function patch(status, el) {
    fetch(`https://backend-ai-postgres.herokuapp.com/user/${status}/${el}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res.json().then((res) => {
          setAnchorEl(false);
          get(searchText);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  }

  // edit user info

  //suspend and re-active
  const handleSuspend = () => {
    setSuspend(!suspend);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 300,
      disableClickEventBubbling: true,
    },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      minWidth: 170,
      disableClickEventBubbling: true,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },

    {
      field: "email_id",
      headerName: "E-mail",
      flex: 1,
      minWidth: 280,
      disableClickEventBubbling: true,
    },
    {
      field: "contact_no",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 130,
      disableClickEventBubbling: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => params.row.role.role_name,
    },
    {
      field: "user_status",
      headerName: "Status",
      minWidth: 120,
      flex: 1,
      sortable: false,
      renderCell: (params) =>
        params.row.user_status
          ? params.row.user_status === "Active"
            ? userActive
            : userSuspend
          : null,
    },

    ...(userRole === 'Super_Admin') ?
    [{
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 130,
      sortable: false,
      renderCell: (e) => {
        //rendercell is helping setting icon three dot

        return (
          <>
            <Box
              onClick={() => {
                if (e.row.user_status === "Active") {
                  setButtonStatus(true);
                } else {
                  setButtonStatus(false);
                }
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "bottom",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "right",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  variant="text"
                  onClick={() => {
                    setStatusViewPopup(true);
                    setEditScreen(true);
                    handleClose(``);
                  }}
                >
                  Edit
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleSuspend();
                  }}
                >
                  {!buttonStatus ? (
                    <div
                      onClick={() => {
                        patch("Activate", delUser);
                        toast.success("User activated successfully", {
                          position: "bottom-right",
                        });
                      }}
                    >
                      Re-Activate
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        patch("Suspend", delUser);
                        toast.success("User suspended successfully", {
                          position: "bottom-right",
                        });
                      }}
                    >
                      Suspend
                    </div>
                  )}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setOpenDeleteUserPopup(true);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </>
        );
      },
    }] : [],
  ];

  const [id, setId] = React.useState("");

  return (
    <div
      style={{
        width: "100%",
        height: 400,
      }}
    >
      <ToastContainer />
      <div className="user-list-header">
        <h2 className="user-list-heading">User List</h2>
        <TextField
          fullWidth
          className="user-search-bar"
          variant="outlined"
          label="Search..."
          onClick={handlesearchbox}
          // helperText={
          //   clicked
          //     ? "Your search will look into user ID, first name, last name, email ID, company and alternate person"
          //     : ""
          // }
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        {/* this is dropdown div */}

        <FormControl className="user-status">
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statusdropdown}
            label="Status"
            onChange={handleStatusdropdown}
          >
            <MenuItem
              value={"All"}
              onClick={() => {
                Statusfilter("All");
              }}
            >
              All
            </MenuItem>
            <MenuItem
              value={"Active"}
              onClick={() => {
                Statusfilter("Active");
              }}
            >
              Active
            </MenuItem>
            <MenuItem
              value={"Suspend"}
              onClick={() => {
                Statusfilter("Suspended");
              }}
            >
              Suspend
            </MenuItem>
          </Select>
        </FormControl>

        {/* this is CreateUser*/}
        {
          (userRole === 'Super_Admin') ?
            <div className="user-add-button">
              <CreateUser
                get={() => {
                  get("");
                }}
              />
            </div>
          :
          false
        }
      </div>

      <DataGrid
        rows={temporaryrow}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        hideFooterSelectedRowCount
        components={{
          Pagination: CustomPagination,
        }}
        onCellClick={(e) => {
          if (e.value !== undefined) {
            setStatusViewPopup(true);
            console.log("params", e);
          }

          setDelUser(e.row.id);
          setId(e.id);
        }}
      />

      {statusViewPopup ? (
        <MaxWidthDialog
          get={get}
          // open3={open3}
          toogleStatus={toogleStatus}
          setEditScreen={setEditScreen}
          editScreen={editScreen}
          id={id}
          patch={patch}
          buttonStatus={buttonStatus}
        />
      ) : null}
      {openDeleteUserPopup ? (
        <AlertPopup
          selectedRowDetails={selectedRowDetails}
          openAlertPopup={openDeleteUserPopup}
          setOpenAlertPopup={setOpenDeleteUserPopup}
          apiContent={"/user/deactivate"}
          dialogTitle={"Delete User"}
          dialogContentText={`Do you really want to delete this user?`}
        />
      ) : null}
    </div>
  );
}

export default UserList;
