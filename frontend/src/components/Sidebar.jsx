import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaThList, FaWindowClose } from "react-icons/fa";
import { MdAccountCircle, MdSettings } from "react-icons/md";
import MediaQuery from "react-responsive";
import "../styles/Sidebar.css";

export default ({ handleClick }) => {
  return (
    <>
      <div className="sidebar">
        <MediaQuery maxWidth={1200}>
          <div className="closeButton">
            <button onClick={() => handleClick(false)}>
              <FaWindowClose />
            </button>
          </div>
        </MediaQuery>
        <div className="account">
          <NavLink
            className="menu-item"
            exact
            to="/account"
            activeClassName="menu-item-active"
          >
            <MdAccountCircle className="menu-item-icon" />{" "}
            <span className="mobile-nav">My Account</span>
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink
              exact
              activeClassName="menu-item-active"
              className="menu-item"
              to="/"
            >
              <FaHome className="menu-item-icon" />
              <span className="mobile-nav">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="menu-item-active"
              className="menu-item"
              to="/entries"
            >
              <FaThList className="menu-item-icon" />
              <span className="mobile-nav">Entries</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="menu-item-active"
              className="menu-item"
              to="/settings"
            >
              <MdSettings className="menu-item-icon" />
              <span className="mobile-nav">Settings</span>
            </NavLink>
          </li>
        </ul>
        <div className="cta">
          <NavLink
            exact
            activeClassName="menu-item-active"
            className="menu-item"
            to="/add"
          >
            <FaPlusCircle className="menu-item-icon" />
            <span className="mobile-nav">Add Entry</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};
