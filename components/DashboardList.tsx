import React from "react";
import { Entry } from "../models/Entry";
import { EntryProvider } from "../context/entry.context";
import DashboardListEntry from "./DashboardListEntry";

export default function DashboardList({ initialEntries, loading }) {
  const [entries, setEntries] = React.useState<Entry[]>(initialEntries);

  return (
    <>
      {!loading && (
        <div className="overflow-x-auto my-4">
          <table className="table w-full table-zebra bordered entry-table">
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
              {entries &&
                entries.map((entry) => (
                  <EntryProvider key={entry.id} initialEntry={entry}>
                    <DashboardListEntry />
                  </EntryProvider>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
