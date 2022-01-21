import { createContext, useState } from "react";

/**
 * show: show or hide alert message
 * type: type of alert message
 * message: message of alert message
 */
interface Message {
  show: boolean;
  type: "success" | "error" | "warning";
  message: string;
}

const msgDefaults: Message = {
  show: false,
  type: "success",
  message: "",
};

export const CustomMessageContext = createContext({
  message: msgDefaults,
  setMessage: (_: Message) => {},
});

export const CustomMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState(msgDefaults);

  return (
    <CustomMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </CustomMessageContext.Provider>
  );
};
