import Navbar from "../components/Navbar";
import EntryLinkCard from "../components/EntryLinkCard";
import { useEffect, useState } from "react";
import { entryService } from "../service/entry.service";
import { Entry } from "../models/Entry";
import EntryTextCard from "../components/EntryTextCard";
import { EntryProvider } from "../context/entry.context";
import { SkeletonCard } from "../components/SkeletonCard";
import Head from "next/head";
import { BsFillGridFill, BsList } from "react-icons/bs";
import EntryList from "../components/DashboardList";
import LayoutSwitch from "../components/LayoutSwitch";

export default function Dashboard() {
  const [linkEntries, setLinkEntries] = useState<Entry[]>([]);
  const [textEntries, setTextEntries] = useState<Entry[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchLinks();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchLinks = async () => {
    await entryService
      .getLinkEntries()
      .then((data) => {
        setLinkEntries(entryService.mapToEntry(data.entries));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    entryService.getTextEntries().then((data) => {
      setTextEntries(entryService.mapToEntry(data.entries));
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#50287d" />
        <title>Reminderse Dashboard</title>
      </Head>
      <Navbar />
      <div className="pg-4 lg:p-10">
        <LayoutSwitch />
      </div>
      {/* <div className="p-4 lg:p-10">
        <div className="tabs tabs-boxed my-1 justify-end bg-transparent">
          <a
            className={`tab ${showGrid ? "tab-active" : ""}`}
            onClick={() => setShowGrid(true)}
          >
            <BsFillGridFill />
          </a>
          <a
            className={`tab ${!showGrid ? "tab-active" : ""}`}
            onClick={() => setShowGrid(false)}
          >
            <BsList />
          </a>
        </div>
        {showGrid ? (
          <>
            <h1 className="my-4 text-4xl font-bold">Links</h1>
            <div className="dashboard">
              {loading ? (
                Array(4)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              ) : linkEntries.length > 0 ? (
                linkEntries.map((entry) => (
                  <EntryProvider key={entry.id} initialEntry={entry}>
                    <EntryLinkCard key={entry.id} link={entry} />
                  </EntryProvider>
                ))
              ) : (
                <p className="text-center">No links added yet.</p>
              )}
            </div>
            <h1 className="my-4 text-4xl font-bold">Texts</h1>
            <div className="dashboard grid-cols-1">
              {loading ? (
                Array(2)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              ) : textEntries.length > 0 ? (
                textEntries.map((entry) => (
                  <EntryProvider key={entry.id} initialEntry={entry}>
                    <EntryTextCard />
                  </EntryProvider>
                ))
              ) : (
                <p className="text-center">No texts added yet.</p>
              )}
            </div>
          </>
        ) : (
          <EntryList linkEntries={linkEntries} textEntries={textEntries} />
        )}
      </div> */}
    </>
  );
}
