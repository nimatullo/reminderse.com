import React, { useState } from "react";
import "./styles/Global.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EntriesPage from "./pages/EntriesPage";
import Sidebar from "./components/Sidebar";
import AddPage from "./pages/AddPage";
import MediaQuery from "react-responsive";
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
  const [showSideBar, setShowSideBar] = useState(false);

  const sideBar = () => {
    if (showSideBar) {
      return <Sidebar />;
    } else {
      return null;
    }
  };

  return (
    <div id="App">
      <Router>
        <MediaQuery minWidth={1200}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        </MediaQuery>
        <MediaQuery maxWidth={1200}>
          {sideBar()}
          <button onClick={() => setShowSideBar(true)}>
            <GiHamburgerMenu />
          </button>
        </MediaQuery>
        <div id="page-wrap">
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/entries" component={EntriesPage} />
            <Route exact path="/add" component={AddPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
