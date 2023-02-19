import React, { useState } from "react";
import "./Navigation.css";

import { GroupIcon, NavArrow, Placeholder, StudentIcon } from "../Icons";
import { NavProps } from "../../Types";
import { FC } from "react";
import "./Navigation.css";

const Navigation: FC<NavProps> = ({ view, changeView }) => {
  const [displayState, setDisplayState] = useState(true);
  const setStudentsView = () => changeView("students");
  const setGroupsView = () => changeView("groups");

  const toggleDisplay = (e: any) => setDisplayState((prev) => !prev);
  return (
    <nav
      className="navigation"
      style={
        displayState
          ? { transform: "translateY(0)" }
          : { transform: "translateY(-75%)" }
      }
    >
      <a onClick={setStudentsView} className="nav-link">
        {StudentIcon()}
      </a>
      <a onClick={setGroupsView} className="nav-link">
        {GroupIcon()}
      </a>
      <a onClick={setStudentsView} className="nav-link">
        {Placeholder()}
      </a>
      <a
        onClick={toggleDisplay}
        className="nav-link"
        style={
          displayState
            ? { transform: "rotate(0deg)" }
            : { transform: "rotate(-180deg)" }
        }
      >
        {NavArrow()}
      </a>
    </nav>
  );
};

export default Navigation;
