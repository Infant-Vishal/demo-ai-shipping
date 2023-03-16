import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  IconButton,
  Drawer,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../styles/Sidebar.css";
import axios from "axios";

const drawerWidth = 240;
const settings = [
  {
    name: "Profile",
    path: "/superadmin/profile",
  },
  {
    name: "Update Password",
    path: "/superadmin/update_new_password",
  },
  {
    name: "Logout",
    path: "/",
  },
];

const SuperAdminDrawer = (props) => {
  const { window, element } = props;
  const [userDetails, setUserDetails] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = localStorage.getItem("userLoggedRole");

  //login status boolean
  const loginStatus = localStorage.getItem("userLoggedLocal");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //sidebar viewing condition
  let menuItemsList = [];
  if (userRole == 'Transporter' || userRole == 'Seller') {
    menuItemsList = [
      {
        menuItemName: "Dashboard",
        icon: <DashboardIcon color="primary" />,
        path: "/superadmin/dashboard",
      },
      {
        menuItemName: "Orders",
        icon: <AddShoppingCartIcon color="primary" />,
        path: "/superadmin/orders",
      },
    ];
  } else {
    menuItemsList = [
      {
        menuItemName: "Dashboard",
        icon: <DashboardIcon color="primary" />,
        path: "/superadmin/dashboard",
      },
      {
        menuItemName: "Users",
        icon: <PeopleIcon color="primary" />,
        path: "/superadmin/users",
      },
      {
        menuItemName: "Orders",
        icon: <AddShoppingCartIcon color="primary" />,
        path: "/superadmin/orders",
      },
    ];
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function getUser() {
    axios
      .get(
        "https://demo-shipping.herokuapp.com/adminUser/in.ent.common.123@gmail.com"
      )
      .then((res) => {
        setUserDetails(res.data);
      });
  }
  useEffect(() => {
    getUser();
  }, []);

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "center", margin: "16px 0px" }}>
        <Avatar
          src={require("../assets/images/int_logo.jpg")}
          sx={{ width: 70, height: 70 }}
        />
      </Toolbar>
      <Divider />
      <List>
        {menuItemsList.map((menuItem) => (
          <ListItem
            button
            key={menuItem.menuItemName}
            onClick={() => navigate(menuItem.path)}
            className={
              location.pathname === menuItem.path ? "active-nav-element" : null
            }
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.menuItemName} />
          </ListItem>
          ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {/* {loginStatus == true ? ( */}
      {userDetails ? (
        <div>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Super Admin
                </Typography>
                {/* Settings Menu */}
                <Box sx={{ marginLeft: "auto" }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Vishal"
                        src={`https://demo-shipping.herokuapp.com/file/${userDetails._id}`}
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Toolbar
                      sx={{ justifyContent: "center", margin: "16px 0px" }}
                    >
                      <Avatar
                        alt="Vishal"
                        src={`https://demo-shipping.herokuapp.com/file/${userDetails._id}`}
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                    </Toolbar>
                    <Typography color="primary" textAlign="center">
                      Vishal
                    </Typography>
                    <Typography
                      textAlign="center"
                      sx={{ color: "#9e9e9e", margin: "14px 0px" }}
                    >
                      Super Admin
                    </Typography>
                    <Divider />
                    <br />
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={() => navigate(setting.path)}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                marginTop: 6,
                padding: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              {element}
            </Box>
          </Box>
        </div>
      ) : null}

      {/* ) : (
        navigate("/")
      )} */}
    </div>
  );
};

SuperAdminDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SuperAdminDrawer;
