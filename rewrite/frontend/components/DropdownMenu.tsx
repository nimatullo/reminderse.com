import React, { useState, useRef, useEffect, useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOpenInNew,
  MdPlayArrow,
  MdEditNote,
  MdOutlineDelete,
  MdPause,
} from "react-icons/md";
import { EntryContextImpl } from "../context/entry.context";
import { EntryType } from "../models/Entry";
import { entryService } from "../service/entry.service";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";

const DropdownMenu = () => {
  const router = useRouter();
  const entryProvider = useContext(EntryContextImpl);
  const [show, setShow] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (container.current && !container.current.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [show, container]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!show) return;

      if (event.key === "Escape") {
        setShow(false);
      }
    };

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [show]);

  function handlePause() {
    entryService.pauseLink(entryProvider.entry.id).then((statusCode) => {
      if (statusCode === 200) {
        entryProvider.updatePausedEntry();
      }
    });
  }

  function handleResume() {
    entryService.resumeLink(entryProvider.entry.id).then((statusCode) => {
      if (statusCode === 200) {
        entryProvider.updateResumedEntry();
      }
    });
  }

  function handleDelete() {
    if (entryProvider.entry.type === EntryType.Link) {
      entryService.deleteLink(entryProvider.entry.id).then((statusCode) => {
        if (statusCode === 200) {
          window.location.reload();
        }
      });
    }
  }

  function handleEdit() {
    entryProvider.entry.type === EntryType.Link ? router.push(`/link/${entryProvider.entry.id}/`) : router.push(`/text/${entryProvider.entry.id}/`);
  }

  return (
    <div ref={container} className="dropdownMenu">
      <button
        className="p-3 btn-circle btn btn-ghost right-5 bottom-5 focus:outline-none focus:shadow-solid hover:bg-secondary-content"
        onClick={() => setShow(!show)}
      >
        <BsThreeDotsVertical />
      </button>

      {show && (
        <Fade top cascade duration={200}>
          <ul className="menu dropdown-content p-4 shadow-lg bg-base-100 rounded-box">
            <li>
              <a href="https://google.com" target={"_blank"}>
                <MdOpenInNew className="inline-block w-5 h-5 mr-2 stroke-current" />
                Open
              </a>
            </li>
            <li>
              {Number(entryProvider.entry.dateOfNextSend) > 0 ? (
                <a onClick={handlePause}>
                  <MdPause className="inline-block w-5 h-5 mr-2 stroke-current" />
                  Pause
                </a>
              ) : (
                <a onClick={handleResume}>
                  <MdPlayArrow className="inline-block w-5 h-5 mr-2 stroke-current" />
                  Resume
                </a>
              )}
            </li>
            <li>
              <a onClick={handleEdit}>
                <MdEditNote className="inline-block w-5 h-5 mr-2 stroke-current" />
                Edit
              </a>
            </li>
            <li>
              <a onClick={handleDelete}>
                <MdOutlineDelete className="inline-block w-5 h-5 mr-2 stroke-current" />
                Delete
              </a>
            </li>
          </ul>
        </Fade>
      )}
    </div>
  );
};

export default DropdownMenu;
