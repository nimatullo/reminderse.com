import * as React from "react";
import DashboardLoading from "./DashboardLoading";
import EntryLinkCard from "./EntryLinkCard";
import EntryTextCard from "./EntryTextCard";

const DashboardGrid = ({ links, texts, loading }) => {
  return (
    <>
      <h1 className="my-4 text-4xl font-bold">Links</h1>
      <div className="dashboard">
        {loading ? (
          <DashboardLoading />
        ) : links.length > 0 ? (
          links.map((entry) => <EntryLinkCard key={entry.id} link={entry} />)
        ) : (
          <p className="text-center">No links added yet.</p>
        )}
      </div>
      <h1 className="my-4 text-4xl font-bold">Texts</h1>
      <div className="dashboard grid-cols-1">
        {loading ? (
          <DashboardLoading />
        ) : texts.length > 0 ? (
          texts.map((entry) => <EntryTextCard key={entry.id} text={entry} />)
        ) : (
          <p className="text-center">No texts added yet.</p>
        )}
      </div>
    </>
  );
};

export default DashboardGrid;
