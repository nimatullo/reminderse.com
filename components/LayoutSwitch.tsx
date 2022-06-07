import * as React from "react";
import { Entry } from "../models/Entry";
import { entryService } from "../service/entry.service";
import { BsFillGridFill, BsList } from "react-icons/bs";
import DashboardList from "./DashboardList";
import DashboardGrid from "./DashboardGrid";
import DashboardLoading from "./DashboardLoading";

const LayoutSwitch = () => {
  const [links, setLinks] = React.useState<Entry[]>([]);
  const [texts, setTexts] = React.useState<Entry[]>([]);
  const [toggleListView, setToggleListView] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchData = async () => {
    await Promise.all([
      entryService.getLinkEntries(),
      entryService.getTextEntries(),
    ])
      .then(([fetchedLinks, fetchedTexts]) => {
        setLinks(entryService.mapToEntry(fetchedLinks.entries));
        setTexts(entryService.mapToEntry(fetchedTexts.entries));
      })
      .finally(() => setLoading(false));
  };

  const toggleView = (view) => {
    setToggleListView(view);
    fetchData();
  };

  return (
    <>
      <div className="tabs tabs-boxed my-1 justify-end bg-transparent">
        <a
          className={`tab ${!toggleListView ? "tab-active" : ""}`}
          onClick={() => toggleView(false)}
        >
          <BsFillGridFill />
        </a>
        <a
          className={`tab ${toggleListView ? "tab-active" : ""}`}
          onClick={() => toggleView(true)}
        >
          <BsList />
        </a>
      </div>
      {toggleListView ? (
        <DashboardList initialEntries={links.concat(texts)} loading={loading} />
      ) : (
        <DashboardGrid links={links} texts={texts} loading={loading} />
      )}
    </>
  );
};

export default LayoutSwitch;
