import axios from "axios";
import { CreateLinkEntry, CreateTextEntry } from "../models/CreateTextEntry";
import { Entry, EntryType } from "../models/Entry";
import { EntryListReponse } from "../models/EntryListResponse";
import { Link } from "../models/Link";
import { Text } from "../models/Text";

const API_URL = "https://reminderse-testing.herokuapp.com";
// const API_URL = "http://localhost:5000";

export const entryService = {
  getLinkEntries,
  getTextEntries,
  pauseLink,
  resumeLink,
  deleteLink,
  deleteText,
  addLink,
  addText,
  getLink,
  getText,
  editLink,
  editText,
  mapToEntry,
};

async function getLinkEntries(): Promise<EntryListReponse> {
  return axios
    .get<EntryListReponse>(`${API_URL}/api/link/list`)
    .then((res) => res.data);
}

async function getTextEntries(): Promise<EntryListReponse> {
  return axios
    .get<EntryListReponse>(`${API_URL}/api/text/list`)
    .then((res) => res.data);
}

function pauseLink(linkId: string): Promise<number> {
  return axios
    .put(`${API_URL}/api/link/${linkId}/pause`)
    .then((res) => res.status);
}

function resumeLink(linkId: string): Promise<number> {
  return axios
    .put(`${API_URL}/api/link/${linkId}/resume`)
    .then((res) => res.status);
}

function deleteLink(linkId: string): Promise<number> {
  return axios
    .delete(`${API_URL}/api/link/${linkId}`)
    .then((res) => res.status);
}

function deleteText(textId: string) {
  return axios
    .delete(`${API_URL}/api/text/${textId}`)
    .then((res) => res.status);
}

function addText(textEntry: CreateTextEntry): Promise<any> {
  return axios.post(`${API_URL}/api/text/add`, textEntry).then((res) => res);
}

function addLink(linkEntry: CreateLinkEntry): Promise<any> {
  return axios.post(`${API_URL}/api/link/add`, linkEntry).then((res) => res);
}

function getLink(linkId: string): Promise<Link> {
  return axios.get(`${API_URL}/api/link/${linkId}`).then((res) => res.data);
}

function getText(textId: string): Promise<Text> {
  return axios.get(`${API_URL}/api/text/${textId}`).then((res) => res.data);
}

function editLink(linkId: string, updatedLink: Link): Promise<number> {
  return axios
    .put(`${API_URL}/api/link/${linkId}`, updatedLink)
    .then((res) => res.status);
}

function editText(textId: string, updatedText: Text): Promise<number> {
  return axios
    .put(`${API_URL}/api/text/${textId}`, updatedText)
    .then((res) => res.status);
}

function mapToEntry(data: any[]): Entry[] {
  return data.map((data) => {
    return {
      id: data.id,
      title: data.entry_title,
      content: data.url ? data.url : data.text_content,
      dateOfNextSend: data.days,
      category: data.category,
      type: data.url ? EntryType.Link : EntryType.Text,
    };
  });
}
