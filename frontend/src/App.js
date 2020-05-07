import React from "react";
import "./styles/Global.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EntriesPage from "./pages/EntriesPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/entries" component={EntriesPage} />
      </Switch>
    </Router>
  );
}

export default App;
