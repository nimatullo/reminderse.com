import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaThList, FaWindowClose } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import MediaQuery from "react-responsive";
import "../styles/Sidebar.css";

export default ({ handleClick, isSideBarVisible }) => {
  return (
    <>
      <div className="background" onClick={() => handleClick(false)} />
      <div className={`sidebar${isSideBarVisible ? " full" : " hidden"}`}>
        <MediaQuery maxWidth={1300}>
          <div className="closeButton">
            <button onClick={() => handleClick(false)}>
              <FaWindowClose />
            </button>
          </div>
        </MediaQuery>
        <ul>
          <li>
            <a
              className="menu-item"
              href="/"
              onClick={() => handleClick(false)}
            >
              <FaHome className="menu-item-icon" data-tip="Home" />
              <span className="mobile-nav">Home</span>
            </a>
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
        <ul className="main-navs">
          <li>
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
          </li>
          <li>
            <NavLink
              onClick={() => handleClick(false)}
              exact
              className="menu-item"
              to="/logout"
            >
              <RiLogoutBoxLine data-tip="Log Out" className="menu-item-icon" />
              <span className="mobile-nav">Log Out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
