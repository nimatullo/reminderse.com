import React, { useEffect } from "react";
import { AiOutlineFileText, AiOutlineLink } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { Entry, EntryType } from "../models/Entry";

export default function DashboardList(props) {
  const [entries, setEntries] = React.useState<Entry[]>([]);

  useEffect(() => {
    setEntries(props.linkEntries.concat(props.textEntries));
  }, []);

  const stripUrl = (url: string) => {
    const pathArray = url.split("/");
    return pathArray[0] + "//" + pathArray[2];
  };

  const simplifyUrl = (url: string) => {
    const pathArray = url.split("/");
    return pathArray[2];
  };

  return (
    <>
      <div className="overflow-x-auto my-4">
        <table className="table w-full table-zebra bordered">
          <thead>
            <tr>
              <th>Type</th>
              <th></th>
              <th>Title</th>
              <th>Content</th>
              <th>Category</th>
              <th>Next email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr className="hover:hover cursor-pointer">
                <td>
                  {entry.type === EntryType.Link ? (
                    <AiOutlineLink />
                  ) : (
                    <AiOutlineFileText />
                  )}
                </td>
                <td>
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        className="table-img"
                        src={`https://logo.clearbit.com/${stripUrl(
                          entry.content
                        )}`}
                        alt={entry.title.charAt(0)}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{entry.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {entry.type === EntryType.Link
                    ? simplifyUrl(entry.content)
                    : entry.content}
                </td>
                <td>{entry.category}</td>
                <td>
                  {Number(entry.dateOfNextSend) < 0
                    ? "Paused"
                    : `${entry.dateOfNextSend} days`}
                </td>
                <td>
                  <button className="btn btn-ghost">
                    <BsThreeDots className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
