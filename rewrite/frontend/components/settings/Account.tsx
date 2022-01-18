import { useState } from "react";
import { MdUnsubscribe } from "react-icons/md";
import Fade from "react-reveal/Fade";
import { userService } from "../../service/user.service";

export function Account() {
  const [showModal, setShowModal] = useState(false);

  function handleUnsubscribe() {
    userService.unsubscribe().then((status) => {
      if (status === 200) {
        userService.logout();
      }});
  }

  return (
    <Fade>
      <div className="my-5 space-y-5 flex flex-col">
        <h2 className="text-xl">Delete account</h2>
        <small>
          Deleting your account will delete your existing entires. You will no
          longer receive emails from Reminderse.
        </small>
      </div>
      <label
        htmlFor="delete-modal"
        className="btn btn-error modal-button w-full"
        onClick={() => setShowModal(true)}
      >
        <MdUnsubscribe className="inline-block w-6 h-6 mr-2 stroke-current" />
        Unsubscribe
      </label>
      <input type="checkbox" checked={showModal} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p>
            Are you sure you want to delete your account? This action is
            irreversible!
          </p>
          <div className="modal-action">
            <label htmlFor="delete-modal" className="btn" onClick={() => setShowModal(false)}>
              Cancel
            </label>
            <label htmlFor="delete-modal" className="btn btn-error" onClick={handleUnsubscribe}>
              Delete
            </label>
          </div>
        </div>
      </div>
    </Fade>
  );
}
