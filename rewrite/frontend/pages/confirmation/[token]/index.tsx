import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { userService } from "../../../service/user.service";
import {BsCheckCircleFill} from "react-icons/bs";
import {BiErrorCircle} from "react-icons/bi";

export default function Confirmation() {
  const router = useRouter();
  const { token } = router.query;

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [description, setDescription] = useState("");
  const [confirmationSuccessful, setConfirmationSuccessful] = useState(false);

  useEffect(() => {
    userService
      .confirmEmail(token as string)
      .then((status) => {
        if (status === 200) {
          setConfirmationMessage("Email confirmed successfully.");
          setDescription("You may now start receiving reminders!");
          setConfirmationSuccessful(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setConfirmationMessage("Your email is already confirmed.");
          setDescription("You should already be receiving reminders.");
          setConfirmationSuccessful(false);
        } else {
          setConfirmationMessage("Invalid confirmation token.");
          setDescription("Please make sure you used the correct link.");
          setConfirmationSuccessful(false);
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 lg:p-10">
        <div
          className={`alert ${
            confirmationSuccessful ? "alert-success" : "alert-error"
          }`}
        >
          <div className="flex-1 justify-center">
            <div className="message flex justify-center flex-col">
							{confirmationSuccessful ? <BsCheckCircleFill className="w-14 h-14 mb-5" /> : <BiErrorCircle className="w-14 h-14 mb-5" />}
              <h1 className="text-4xl font-bold">{confirmationMessage}</h1>
              <p className="text-lg">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
