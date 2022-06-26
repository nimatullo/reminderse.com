import React, { useState, useEffect, useContext } from "react";
import { AiOutlineFileText, AiOutlineLink } from "react-icons/ai";
import { entryService } from "../service/entry.service";
import TableDropdown from "./TableDropdown";
import { EntryContextImpl } from "../context/entry.context";
import { Entry, EntryType } from "../models/Entry";
import { useRouter } from "next/router";

const DashboardListEntry = () => {
  const entryProvider = useContext(EntryContextImpl);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const stripUrl = (url: string) => {
    const pathArray = url.split("/");
    return pathArray[0] + "//" + pathArray[2];
  };

  const simplifyUrl = (url: string) => {
    const pathArray = url.split("/");
    return pathArray[2];
  };

  const handleClick = () => {
    if (entryProvider.entry.type === EntryType.Text) {
      setIsOpen(true);
    } else {
      window.open(entryProvider.entry.content, "_blank");
    }
  };

  return (
    <>
      <tr className="hover:hover cursor-pointer entry-table-row">
        <td>
          {entryProvider.entry.type === EntryType.Link ? (
            <AiOutlineLink />
          ) : (
            <AiOutlineFileText />
          )}
        </td>
        <td onClick={handleClick}>
          <div className="avatar">
            <div className="w-12">
              <img
                className="table-img"
                src={`https://logo.clearbit.com/${stripUrl(
                  entryProvider.entry.content
                )}`}
                alt={entryProvider.entry.title.charAt(0)}
              />
            </div>
          </div>
        </td>
        <td onClick={handleClick}>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{entryProvider.entry.title}</div>
            </div>
          </div>
        </td>
        <td onClick={handleClick}>
          {entryProvider.entry.type === EntryType.Link
            ? simplifyUrl(entryProvider.entry.content)
            : entryProvider.entry.content}
        </td>
        <td onClick={handleClick}>{entryProvider.entry.category}</td>
        <td onClick={handleClick}>
          {entryService.formatDate(entryProvider.entry.date_of_next_send)}
        </td>
        <td>
          <TableDropdown entry={entryProvider.entry} />
        </td>
      </tr>
      {entryProvider.entry.type === EntryType.Text && (
        <>
          <input
            type="checkbox"
            id="my-modal-2"
            checked={isOpen}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box">
              <h1 className="text-2xl text-bold">
                {entryProvider.entry.title}
              </h1>
              <div className="divider" />
              <p>{entryProvider.entry.content}</p>
              <div className="modal-action">
                <label
                  htmlFor="my-modal-2"
                  className="btn btn-primary"
                  onClick={() => router.push(`/text/${entryProvider.entry.id}`)}
                >
                  Edit
                </label>
                <label
                  htmlFor="my-modal-2"
                  className="btn"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardListEntry;
