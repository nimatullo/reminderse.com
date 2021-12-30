import axios from "axios";
import { Entry, EntryType } from "../models/Entry";
import { EntryListReponse } from "../models/EntryListResponse";

const API_URL = "http://localhost:5000";


export const entryService = {
	getLinkEntries,
	getTextEntries,
	pauseLink,
	resumeLink,
	deleteLink,
	deleteText,
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

function pauseLink(linkId: string): Promise<number> {
	return axios
		.put(`${API_URL}/api/link/${linkId}/pause`)
		.then(res => res.status);
}

function resumeLink(linkId: string): Promise<number> {
	return axios
		.put(`${API_URL}/api/link/${linkId}/resume`)
		.then(res => res.status)
}

function deleteLink(linkId: string): Promise<number> {
	return axios
		.delete(`${API_URL}/api/link/${linkId}`)
		.then(res => res.status)
}

function deleteText(textId: string) {
	return axios
		.delete(`${API_URL}/api/text/${textId}`)
		.then(res => res.status)
}

function mapToEntry(data: any[]): Entry[] {
	return data.map(data => {
		return {
			id: data.id,
			title: data.entry_title,
			content: data.url ? data.url : data.text_content,
			dateOfNextSend: data.days,
			category: data.category,
			type: data.url ? EntryType.Link : EntryType.Text
		}
	})
}