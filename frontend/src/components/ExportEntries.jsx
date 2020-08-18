import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_ROOT_URL } from "../constants";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";

const ExportEntries = () => {
  const [links, setLinks] = useState([]);
  const [texts, setTexts] = useState([]);
  const history = useHistory();
  const [selectedEntries, setSelectedEntries] = useState([]);
  useEffect(() => {
    fetchEntries();
  }, []);
  const fetchEntries = async () => {
    try {
      const data = await Axios.all([
        Axios.get(`${API_ROOT_URL}/api/link/list`),
        Axios.get(`${API_ROOT_URL}/api/text/list`),
      ]).then(
        Axios.spread((links, texts) => {
          setLinks(links.data);
          setTexts(texts.data);
        })
      );
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        history.push("/logout");
      }
    }
  };
  function addEntry(entry) {
    let foundEntry = links.filter((link) => link.id === entry.id);
    if (foundEntry.length < 1) {
      foundEntry = texts.filter((text) => text.id === entry.id);
    }
    setSelectedEntries(selectedEntries.concat(foundEntry));
  }
  return (
    <div>
      {links.map((link) => (
        <>
          <input
            type="checkbox"
            value={link.entry_title}
            name={link.entry_title}
            id={link.id}
            onClick={() => addEntry(link)}
          />
          <label htmlFor={link.id}>{link.entry_title}</label>
          <br />
        </>
      ))}
      {texts.map((text) => (
        <>
          <input
            type="checkbox"
            value={text.entry_title}
            name={text.entry_title}
            id={text.id}
            onClick={() => addEntry(text)}
          />
          <label htmlFor={text.id}>{text.entry_title}</label>
          <br />
        </>
      ))}
      <Button label="Export" />
    </div>
  );
};

export default ExportEntries;
