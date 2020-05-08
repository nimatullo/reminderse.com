import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ open, hide, content, headerTitle }) =>
  open
    ? ReactDOM.createPortal(
        <>
          <div className="dialog-overlay" />
          <div className="dialog-wrapper" role="dialog">
            <div className="dialog">
              <div className="dialog-header">
                <div>{headerTitle}</div>
                <button
                  type="button"
                  className="dialog-close-button"
                  data-dismiss="dialog"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
              {content}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
