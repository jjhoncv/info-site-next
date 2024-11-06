import { BanIcon, CheckIcon, Icon, XIcon, icons } from "lucide-react";
import toast, { Toast } from "react-hot-toast";

const SplashAlert = ({
  message,
  type,
  t,
}: {
  message: string;
  type: "success" | "error";
  t: Toast;
}) => {
  const color = type === "success" ? "#10B981" : "#f83737";
  const title = type === "success" ? "Success" : "Error";

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      }    shadow-lg bg-white rounded-lg pointer-events-auto flex justify-between `}
      style={{ maxWidth: "400px", minWidth: "400px" }}
    >
      <div
        className="flex-shrink-0 pt-0.5 h-full"
        style={{
          width: "5px",
          backgroundColor: color,
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
        }}
      />
      <div
        className="h-full flex items-center justify-center px-2"
        style={{
          width: "50px",
          marginLeft: "4px",
          marginRight: "7px",
          minWidth: "50px",
        }}
      >
        <div
          style={{
            backgroundColor: color,
            minWidth: "30px",
            height: "30px",
          }}
          className="rounded-full flex justify-center items-center"
        >
          {type === "success" ? (
            <CheckIcon size={15} color="white" />
          ) : (
            <XIcon size={15} color="white" />
          )}
        </div>
      </div>

      <div className="flex-1 py-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="font-bold" style={{ color }}>
              {title}
            </p>
            <p className="mt-1  text-gray-700">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200  p-4">
        <button onClick={() => toast.dismiss(t.id)} className="flex h-full">
          <XIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export const ToastSuccess = (message: string) => {
  toast.custom((t) => <SplashAlert message={message} t={t} type="success" />, {
    duration: 4000,
    position: "top-right",
  });
};

export const ToastFail = (message: string) => {
  toast.custom((t) => <SplashAlert message={message} t={t} type="error" />, {
    duration: 3000,
    position: "top-right",
  });
};
