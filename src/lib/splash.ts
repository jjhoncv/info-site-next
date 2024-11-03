import toast, { ToastOptions } from "react-hot-toast";

export const ToastSuccess = (message: string) => {
  const options: ToastOptions = {
    duration: 3000,
    position: "top-right",
    style: {
      background: "#10B981",
      color: "#fff",
    },
  };

  toast.success(message, options);
};

export const ToastFail = (message: string) => {
  const options: ToastOptions = {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#EF4444",
      color: "#fff",
      borderColor: "#EF4444",
    },
  };

  toast.error(message, options);
};
