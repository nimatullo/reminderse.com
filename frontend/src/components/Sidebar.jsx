import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaThList, FaWindowClose } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import MediaQuery from "react-responsive";
import "../styles/Sidebar.css";
import ReactTooltip from "react-tooltip";

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
        <ul>
          <li>
            <NavLink
              exact
              activeClassName="menu-item-active"
              className="menu-item"
              to="/"
              onClick={() => handleClick(false)}
            >
              <FaHome className="menu-item-icon" data-tip="Home" />
              <span className="mobile-nav">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="menu-item-active"
              className="menu-item"
              to="/entries"
              onClick={() => handleClick(false)}
            >
              <FaThList data-tip="Entries" className="menu-item-icon" />
              <span className="mobile-nav">Entries</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="menu-item-active"
              className="menu-item"
              to="/settings"
              onClick={() => handleClick(false)}
            >
              <MdSettings data-tip="Settings" className="menu-item-icon" />
              <span className="mobile-nav">Settings</span>
            </NavLink>
          </li>
        </ul>
        <NavLink
          exact
          activeClassName="menu-item-active"
          className="menu-item"
          to="/add"
          onClick={() => handleClick(false)}
        >
          <FaPlusCircle data-tip="Add Entry" className="menu-item-icon" />
          <span className="mobile-nav">Add Entry</span>
        </NavLink>
        <NavLink
          onClick={() => handleClick(false)}
          exact
          className="menu-item"
          to="/logout"
        >
          <RiLogoutBoxLine data-tip="Log Out" className="menu-item-icon" />
          <span className="mobile-nav">Log Out</span>
        </NavLink>
      </div>
      <ReactTooltip place={"right"} delayShow={500} offset={{ right: 25 }} />
    </>
  );
};
