import { useEffect } from "react";
import useMessage from "../context/customMessageHook";
import Fade from "react-reveal/Fade";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { IoMdWarning } from "react-icons/io";

export default function Snackbar() {
  const { message, setMessage } = useMessage();

  const getAlertIcon = () => {
    switch (message.type) {
      case "success":
        return <BiCheckCircle className="w-6 h-6 mx-2" />;
      case "error":
        return <BiErrorCircle className="w-6 h-6 mx-2" />;
      case "warning":
        return <IoMdWarning className="w-6 h-6 mx-2" />;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage({
        ...message,
        show: false,
      });
    }, 3000);
  }, [message.show]);

  return (
    <>
      {message.show && (
        <Fade top>
          <div className={`alert alert-${message.type} shadow-sm`}>
            <div className="flex-1">
              {getAlertIcon()}
              <label>{message.message}</label>
            </div>
          </div>
        </Fade>
      )}
    </>
  );
}
