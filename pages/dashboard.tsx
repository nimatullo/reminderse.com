import Navbar from "../components/Navbar";
import EntryLinkCard from "../components/EntryLinkCard";
import { useEffect, useState } from "react";
import { entryService } from "../service/entry.service";
import { Entry } from "../models/Entry";
import Router from "next/router";
import EntryTextCard from "../components/EntryTextCard";
import { EntryProvider } from "../context/entry.context";
import { SkeletonCard } from "../components/SkeletonCard";
import { userService } from "../service/user.service";

export default function Dashboard() {
  const [linkEntries, setLinkEntries] = useState<Entry[]>([]);
  const [textEntries, setTextEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      entryService
        .getLinkEntries()
        .then((data) => {
          setLinkEntries(entryService.mapToEntry(data.entries));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("user");
            userService.userValue.next(null);
            Router.push("/login");
          }
        })
        .finally(() => setLoading(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    entryService
      .getTextEntries()
      .then((data) => {
        setTextEntries(entryService.mapToEntry(data.entries));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          userService.userValue.next(null);
          Router.push("/login");
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 lg:p-10">
        <h1 className="my-4 text-4xl font-bold">Links</h1>
        <div className="dashboard">
          {loading &&
            Array(4)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)}
          {!loading && linkEntries.length > 0 ? (
            linkEntries.map((entry) => (
              <EntryProvider key={entry.id} initialEntry={entry}>
                <EntryLinkCard />
              </EntryProvider>
            ))
          ) : (
            <p className="text-center">No links added yet.</p>
          )}
        </div>
        <h1 className="my-4 text-4xl font-bold">Texts</h1>
        <div className="dashboard grid-cols-1">
          {loading &&
            Array(2)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)}
          {!loading && textEntries.length > 0 ? (
            textEntries.map((entry) => (
              <EntryProvider key={entry.id} initialEntry={entry}>
                <EntryTextCard />
              </EntryProvider>
            ))
          ) : (
            <p className="text-center">No texts added yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
