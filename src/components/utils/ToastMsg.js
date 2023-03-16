import React from "react";
import { toast } from "react-toastify";

export const ToastErrMsg = (errorMsg) => {
  toast.error(`${errorMsg}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastSuccessMsg = (successMsg) => {
  toast.success(`${successMsg}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
