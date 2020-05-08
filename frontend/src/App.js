import React from "react";
import "./styles/Global.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EntriesPage from "./pages/EntriesPage";
import Sidebar from "./components/Sidebar";
import AddPage from "./pages/AddPage";

function App() {
  return (
    <div id="App">
      <Router>
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
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
