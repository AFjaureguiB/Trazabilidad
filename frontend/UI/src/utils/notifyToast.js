import { Bounce, toast } from "react-toastify";

const toastProps = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const notifySuccess = (message) => {
  return toast.success(message, toastProps);
};

export const notifyError = (errorMessage) => {
  return toast.error(errorMessage, toastProps);
};
