import axios from "axios";
import Router from "next/router";
import { CreateEntry } from "../models/CreateEntry";
import { Entry, EntryType } from "../models/Entry";
import { EntryListReponse } from "../models/EntryListResponse";
import { Link } from "../models/Link";
import { Text } from "../models/Text";
import { userService } from "./user.service";
import { API_URL } from "../models/constants";
import Cookies from "js-cookie";

const entryApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

entryApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.common["X-CSRF-TOKEN"] = Cookies.get("csrf_access_token");
  }
  return config;
});

entryApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      if (error.response.status === 401) {
        userService.clearUserInformation();
        Router.push("/login");
      } else {
        return error;
      }
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error;
    }
  }
);

export const entryService = {
  getLinkEntries,
  getTextEntries,
  pauseLink,
  resumeLink,
  pauseText,
  resumeText,
  deleteLink,
  deleteText,
  addLink,
  addText,
  getLink,
  getText,
  editLink,
  editText,
  mapToEntry,
  formatDate,
  getDays,
};

async function getLinkEntries(): Promise<EntryListReponse> {
  return entryApi.get<EntryListReponse>(`/links/`).then((res) => res.data);
}

async function getTextEntries(): Promise<EntryListReponse> {
  return entryApi.get<EntryListReponse>(`/texts/`).then((res) => res.data);
}

async function pauseLink(linkId: string): Promise<number> {
  return entryApi.put(`/links/${linkId}/pause`).then((res) => res.status);
}

async function resumeLink(linkId: string): Promise<number> {
  return entryApi.put(`/links/${linkId}/resume`).then((res) => res.status);
}

async function pauseText(textId: string): Promise<number> {
  return entryApi.put(`/texts/${textId}/pause`).then((res) => res.status);
}

async function resumeText(textId: string): Promise<number> {
  return entryApi.put(`/texts/${textId}/resume`).then((res) => res.status);
}

async function deleteLink(linkId: string): Promise<number> {
  return entryApi.delete(`/links/${linkId}`).then((res) => res.status);
}

async function deleteText(textId: string) {
  return entryApi.delete(`/texts/${textId}`).then((res) => res.status);
}

async function addText(textEntry: CreateEntry): Promise<any> {
  return entryApi.post(`/texts/`, textEntry).then((res) => res);
}

async function addLink(linkEntry: CreateEntry): Promise<any> {
  return entryApi.post(`/links/`, linkEntry).then((res) => res);
}

async function getLink(linkId: string): Promise<Link> {
  return entryApi.get(`/links/${linkId}`).then((res) => res.data);
}

async function getText(textId: string): Promise<Text> {
  return entryApi.get(`/texts/${textId}`).then((res) => res.data);
}

async function editLink(
  linkId: string,
  updatedLink: CreateEntry
): Promise<number> {
  return entryApi
    .put(`/links/${linkId}`, updatedLink)
    .then((res) => res.status);
}

async function editText(textId: string, updatedText: Text): Promise<number> {
  return entryApi
    .put(`/texts/${textId}`, updatedText)
    .then((res) => res.status);
}

function mapToEntry(data: any[]): Entry[] {
  return data.map((data) => {
    return {
      id: data.id,
      title: data.entry_title,
      content: data.url ? data.url : data.content,
      date_of_next_send: data.date_of_next_send,
      category: data.category,
      type: data.url ? EntryType.Link : EntryType.Text,
    };
  });
}

function formatDate(date: string) {
  const daysBetweenNow = getDays(date);
  if (daysBetweenNow < 0) {
    return "Paused";
  } else if (daysBetweenNow === 0) {
    return "Today";
  } else if (daysBetweenNow === 1) {
    return "Tomorrow";
  } else {
    return `Next email goes out in ${daysBetweenNow} days`;
  }
}

function getDays(date: string): number {
  const dateOfNextSend = new Date(date);
  const today = new Date();
  const diff = dateOfNextSend.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
}
