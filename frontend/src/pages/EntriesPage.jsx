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
  return (
    <main style={{ padding: "1em" }}>
      <h1>Links</h1>
      <div className="grid">
        {links.map((link) => (
          <LinkCard key={link.id} data={link} />
        ))}
      </div>
      <h1>Texts</h1>
      <div className="list">
        {texts.map((text) => (
          <TextCard key={text.id} data={text} />
        ))}
      </div>
    </main>
  );
};

export default EntriesPage;
