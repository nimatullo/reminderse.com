import React, { useState, useRef, useEffect, useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOpenInNew,
  MdPlayArrow,
  MdEditNote,
  MdOutlineDelete,
  MdPause,
} from "react-icons/md";
import { EntryType } from "../models/Entry";
import { entryService } from "../service/entry.service";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";

const DropdownMenu = ({ entry, date, setDate }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const container = useRef<any>(null);

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

  const get3DaysAhead = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toDateString();
  };

  async function handlePause() {
    if (entry.type === EntryType.Link) {
      await entryService.pauseLink(entry.id).then((statusCode) => {
        if (statusCode === 200) {
          setDate(-1);
        }
      });
    } else {
      await entryService.pauseText(entry.id).then((statusCode) => {
        if (statusCode === 200) {
          setDate(-1);
        }
      });
    }
  }

  async function handleResume() {
    if (entry.type === EntryType.Link) {
      await entryService.resumeLink(entry.id).then((statusCode) => {
        if (statusCode === 200) {
          setDate(get3DaysAhead());
        }
      });
    } else {
      await entryService.resumeText(entry.id).then((statusCode) => {
        if (statusCode === 200) {
          setDate(get3DaysAhead());
        }
      });
    }
  }

  function handleDelete() {
    if (entry.type === EntryType.Link) {
      entryService.deleteLink(entry.id).then((statusCode) => {
        if (statusCode === 200) {
          window.location.reload();
        }
      });
    } else if (entry.type === EntryType.Text) {
      entryService.deleteText(entry.id).then((statusCode) => {
        if (statusCode === 200) {
          window.location.reload();
        }
      });
    }
  }

  function handleEdit() {
    entry.type === EntryType.Link
      ? router.push(`/link/${entry.id}/`)
      : router.push(`/text/${entry.id}/`);
  }

  return (
    <div ref={container} className="dropdownMenu">
      <button
        className="p-3 btn-circle btn btn-ghost right-5 bottom-5 focus:outline-none focus:shadow-solid hover:bg-secondary-content hover:opacity-80"
        onClick={() => setShow(!show)}
      >
        <BsThreeDotsVertical />
      </button>

      {show && (
        <Fade top cascade duration={200}>
          <ul className="menu dropdown-content p-4 shadow-lg bg-base-100 rounded-box z-10">
            {entry.type === EntryType.Link && (
              <li>
                <a href={entry.content} target={"_blank"}>
                  <MdOpenInNew className="inline-block w-5 h-5 mr-2 stroke-current" />
                  Open
                </a>
              </li>
            )}
            <li>
              {entryService.getDays(date) > 0 ? (
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
                <span className="text-red">Edit</span>
              </a>
            </li>
            <li>
              <a onClick={handleDelete}>
                <MdOutlineDelete className="inline-block w-5 h-5 mr-2 fill-error" />
                <span className="text-error">Delete</span>
              </a>
            </li>
          </ul>
        </Fade>
      )}
    </div>
  );
};

export default DropdownMenu;
