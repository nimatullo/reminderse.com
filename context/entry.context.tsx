import { createContext, FC, useContext, useState } from "react";
import { Entry } from "../models/Entry";

export interface EntryContext {
  entry: Entry;
  updatePausedEntry: () => void;
  updateResumedEntry: () => void;
}

export const EntryContextImpl = createContext<EntryContext>(null!);

export function useEntry() {
  return useContext(EntryContextImpl);
}

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toDateString();
};

const get3DaysAhead = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toDateString();
};

interface Props {
  initialEntry: Entry;
}

export const EntryProvider: FC<Props> = ({ initialEntry, children }) => {
  const [entry, setEntry] = useState(initialEntry);

  const pauseEntry = () => {
    setEntry({
      ...entry,
      date_of_next_send: getYesterday(),
    });
  };

  const resumeEntry = () => {
    setEntry({
      ...entry,
      date_of_next_send: get3DaysAhead(),
    });
  };

  return (
    <EntryContextImpl.Provider
      value={{
        entry: entry,
        updatePausedEntry: pauseEntry,
        updateResumedEntry: resumeEntry,
      }}
    >
      {children}
    </EntryContextImpl.Provider>
  );
};
