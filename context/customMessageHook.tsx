import { useContext } from "react";
import { CustomMessageContext } from "./error.context";

const useMessage = () => {
	const {message, setMessage} = useContext(CustomMessageContext);
	return {message, setMessage};
}
export default useMessage;