import { useState } from "react";
import { Account } from "./settings/Account";
import MyDetails from "./settings/Details";
import { Entries } from "./settings/Entries";
import Password from "./settings/Password";
import Fade from "react-reveal/Fade";

export default function Tabs() {
  const tabLabels = ["My details", "Password", "Account", "Entries"];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSwitch = (tab: number) => {
    setActiveTab(tab);
  };

  const renderTabContent = (tab: number) => {
    switch (tab) {
      case 0:
        return <MyDetails />;
      case 1:
        return <Password />;
      case 2:
        return <Account/>
      case 3:
        return <Entries/>
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tabs">
        {tabLabels.map((label, index) => (
          <div
            className={`tab tab-bordered px-2 md:px-4 ${
              activeTab === index ? "tab-active" : ""
            }`}
            key={index}
            onClick={() => handleTabSwitch(index)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="tab-content">{renderTabContent(activeTab)}</div>
    </>
  );
}
