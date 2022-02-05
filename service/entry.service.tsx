import axios from "axios";
import Router from "next/router";
import { CreateLinkEntry, CreateTextEntry } from "../models/CreateTextEntry";
import { Entry, EntryType } from "../models/Entry";
import { EntryListReponse } from "../models/EntryListResponse";
import { Link } from "../models/Link";
import { Text } from "../models/Text";
import { userService } from "./user.service";
import { API_URL, CSRF_TOKEN } from "../models/constants";
import Cookies from "js-cookie";

const entryApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

entryApi.interceptors.request.use(
  (config) => {
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
  return entryApi
    .get<EntryListReponse>(`/api/link/list`)
    .then((res) => res.data);
}

async function getTextEntries(): Promise<EntryListReponse> {
  return entryApi
    .get<EntryListReponse>(`/api/text/list`)
    .then((res) => res.data);
}

function pauseLink(linkId: string): Promise<number> {
  return entryApi
    .put(`/api/link/${linkId}/pause`)
    .then((res) => res.status);
}

function resumeLink(linkId: string): Promise<number> {
  return entryApi
    .put(`/api/link/${linkId}/resume`)
    .then((res) => res.status);
}

function deleteLink(linkId: string): Promise<number> {
  return entryApi
    .delete(`/api/link/${linkId}`)
    .then((res) => res.status);
}

function deleteText(textId: string) {
  return entryApi
    .delete(`/api/text/${textId}`)
    .then((res) => res.status);
}

function addText(textEntry: CreateTextEntry): Promise<any> {
  return entryApi.post(`/api/text/add`, textEntry).then((res) => res);
}

function addLink(linkEntry: CreateLinkEntry): Promise<any> {
  return entryApi.post(`/api/link/add`, linkEntry).then((res) => res);
}

function getLink(linkId: string): Promise<Link> {
  return entryApi.get(`/api/link/${linkId}`).then((res) => res.data);
}

function getText(textId: string): Promise<Text> {
  return entryApi.get(`/api/text/${textId}`).then((res) => res.data);
}

function editLink(linkId: string, updatedLink: Link): Promise<number> {
  return entryApi
    .put(`/api/link/${linkId}`, updatedLink)
    .then((res) => res.status);
}

function editText(textId: string, updatedText: Text): Promise<number> {
  return entryApi
    .put(`/api/text/${textId}`, updatedText)
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
