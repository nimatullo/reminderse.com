import React from "react";
import "./styles/Global.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div id="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Navigation />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
