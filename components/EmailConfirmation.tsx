import { useEffect, useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { userService } from "../service/user.service";

export default function EmailConfirmation() {
  const [isConfirmed, setIsConfirmed] = useState(true);

  useEffect(() => {
    userService.isEmailConfirmed().then((res) => {
      setIsConfirmed(res);
    });
  }, []);

  return (
    <>
      {isConfirmed ? (
        <div className="alert flex-col text-center space-y-5">
          <div className="flex-1">
            <label>
              <h2 className="font-bold">
                Your email has not yet been confirmed yet.
              </h2>
              <p className="text-sm">
                You may continue adding entries but you won't receive reminders
                for those entries.
              </p>
            </label>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm lg:btn-md btn-info">
              <MdMarkEmailRead className="inline-block w-6 h-6 mr-2" />
              Resend confirmation email
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
