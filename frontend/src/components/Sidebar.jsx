import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaThList } from "react-icons/fa";
import { MdAccountCircle, MdSettings } from "react-icons/md";

export default (props) => {
  return (
    <>
      <div className="sidebar">
        <div className="account">
          <NavLink
            className="menu-item"
            exact
            to="/account"
            activeClassName="menu-item-active"
          >
            <MdAccountCircle className="menu-item-icon" />
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
          </NavLink>
        </div>
      </div>
    </>
  );
};
