import React, { useState, useEffect } from "react";
import Axios from "axios";
import LinkCard from "../components/LinkCard";
import TextCard from "../components/TextCard";

const EntriesPage = () => {
  const [links, setLinks] = useState([]);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    Axios.all([Axios.get("/api/link/list"), Axios.get("/api/text/list")]).then(
      Axios.spread((links, texts) => {
        setLinks(links.data);
        setTexts(texts.data);
      })
    );
  }, []);
  if (links.length > 0 && texts.length > 0) {
    return (
      <div>
        <h1>Links</h1>
        <div className="grid">
          {links.length > 0
            ? links.map((link) => <LinkCard key={link.id} data={link} />)
            : null}
        </div>
        <h1>Texts</h1>
        <div className="list">
          {texts.length > 0
            ? texts.map((text) => <TextCard key={text.id} data={text} />)
            : null}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default EntriesPage;
