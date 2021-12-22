import axios from "axios";
import { Entry } from "../models/Entry";
import { EntryListReponse } from "../models/EntryListResponse";

const API_URL = "http://localhost:5000";

export const entryService = {
	getLinkEntries,
	getTextEntries,
	mapToEntry
}

function getLinkEntries(): Promise<EntryListReponse> {
	return axios
		.get<EntryListReponse>(`${API_URL}/api/link/list`)
		.then(res => res.data);
}

function getTextEntries(): Promise<EntryListReponse> {
	return axios
		.get<EntryListReponse>(`${API_URL}/api/text/list`)
		.then(res => res.data);
}

function mapToEntry(data: any[]): Entry[] {
	return data.map(data => {
		return {
			id: data.id,
			title: data.entry_title,
			content: data.url ? data.url : data.text_content,
			dateOfNextSend: data.days,
			category: data.category,
		}
	})
}