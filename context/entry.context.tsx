import { createContext, FC, useContext, useState } from "react";
import { Entry } from "../models/Entry";

export interface EntryContext {
	entry: Entry,
	updatePausedEntry:	() => void,
	updateResumedEntry:	() => void,
}

export const EntryContextImpl = createContext<EntryContext>(null!)

export function useEntry() {
	return useContext(EntryContextImpl);
}

interface Props {
	initialEntry: Entry;
}

export const EntryProvider: FC<Props> = ({ initialEntry, children }) => {
	const [entry, setEntry] = useState(initialEntry);

	const pauseEntry = () => {
		setEntry({
			...entry,
			dateOfNextSend: "-1",
		})
	};

	const resumeEntry = () => {
		setEntry({
			...entry,
			dateOfNextSend: "3",
		})
	};

	return (
		<EntryContextImpl.Provider value={{ entry: entry, updatePausedEntry: pauseEntry, updateResumedEntry: resumeEntry }}>
			{children}
		</EntryContextImpl.Provider>
	)
}