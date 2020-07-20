import React, { useState } from 'react';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EntriesPage from "../pages/EntriesPage";
import Sidebar from "../components/Sidebar";
import AddPage from "../pages/AddPage";
import MediaQuery from "react-responsive";
import { GiHamburgerMenu } from "react-icons/gi";
import EditLinkPage from "../pages/EditLinkPage";
import EditTextPage from "../pages/EditTextPage";
import SettingsPage from "../pages/SettingsPage";
import LogoutPage from "../pages/LogoutPage";
import PrivateRoute from "../auth/PrivateRoute";
import { AuthContext } from "../context/Auth";
import Axios from "axios";
import Cookies from "js-cookie";
import Homepage from "../pages/Homepage";
import "../styles/Global.css";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import ConfirmationPage from '../pages/ConfirmationPage';

const Navigation = () => {
    const [showSideBar, setShowSideBar] = useState(false);
    const history = useHistory();

    const existingUser = JSON.parse(localStorage.getItem("user"));
    const [currentUser, setCurrentUser] = useState(existingUser);

    const setUser = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(data);
    };


    Axios.defaults.headers.common["X-CSRF-TOKEN"] = Cookies.get("csrf_access_token")
    Axios.defaults.withCredentials = true

    const sideBar = () => {
        if (showSideBar) {
            return <Sidebar handleClick={setShowSideBar} />;
        } else {
            return null;
        }
    };

    return (
        <div className="content">
            <AuthContext.Provider value={{ currentUser, setCurrentUser: setUser }}>
                <Router>
                    <MediaQuery minWidth={1200}>
                        <Sidebar
                            handleClick={setShowSideBar}
                        />
                    </MediaQuery>
                    <MediaQuery maxWidth={1200}>
                        {sideBar()}
                        <div className="hamburgerButton">
                            <button
                                style={{
                                    display: showSideBar ? "none" : "block",
                                }}
                                onClick={() => setShowSideBar(true)}
                            >
                                <GiHamburgerMenu />
                            </button>
                        </div>
                    </MediaQuery>
                    <div id="page-wrap">
                        <Switch>
                            <Route exact path="/confirm-email/:token" component={ConfirmationPage} />
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/register" component={RegisterPage} />
                            <PrivateRoute exact path="/settings" component={SettingsPage} />
                            <PrivateRoute exact path="/entries" component={EntriesPage} />
                            <PrivateRoute exact path="/add" component={AddPage} />
                            <PrivateRoute
                                exact
                                path="/edit/link/:id"
                                component={EditLinkPage}
                            />
                            <PrivateRoute
                                exact
                                path="/edit/text/:id"
                                component={EditTextPage}
                            />
                            <PrivateRoute exact path="/logout" component={LogoutPage} />
                        </Switch>
                    </div>
                </Router>
            </AuthContext.Provider>
        </div>

    );
}

export default Navigation;