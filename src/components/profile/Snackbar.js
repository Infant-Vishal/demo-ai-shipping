import React from "react";
import { Alert, Snackbar } from "@mui/material";

export const SnackbarContext = React.createContext();

export default function CustomizedSnackbars({ children }) {
  const [stateSnackbar, setStateSnackbar] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  const setStateSnackbarContext = (open, message, severity) =>
    setStateSnackbar({ ...stateSnackbar, open, message, severity });

  const handleClose = () => setStateSnackbar({ ...stateSnackbar, open: false });

  const { open, severity, message } = stateSnackbar;

  return (
    <SnackbarContext.Provider value={setStateSnackbarContext}>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
      {children}
    </SnackbarContext.Provider>
  );
}
