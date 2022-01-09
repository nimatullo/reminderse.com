import { useState } from "react";
import MyDetails from "./settings/Details";
import Password from "./settings/Password";

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
        return <div>Account</div>;
      case 3:
        return <div>Entries</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tabs">
        {tabLabels.map((label, index) => (
          <div
            className={`tab tab-bordered ${
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
