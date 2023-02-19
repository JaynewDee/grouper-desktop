import React, { useState } from "react";
import "./Navigation.css";

import { GroupIcon, NavArrow, Placeholder, StudentIcon } from "../Icons";
import { NavProps } from "../../Types";
import { FC } from "react";
import "./Navigation.css";

const Navigation: FC<NavProps> = ({ view }) => {
  const [displayState, setDisplayState] = useState(true);

  const toggleDisplay = (e: any) => setDisplayState((prev) => !prev);
  return (
    <nav
      className="navigation"
      style={
        displayState
          ? { transform: "translateY(0)" }
          : { transform: "translateY(-83%)" }
      }
    >
      <a
        className="nav-link"
        style={view === "students" ? { color: "cyan" } : {}}
      >
        {StudentIcon()}
      </a>
      <a
        className="nav-link"
        style={view === "groups" ? { color: "cyan" } : {}}
      >
        {GroupIcon()}
      </a>
      <a className="nav-link">{Placeholder()}</a>
      <a
        onClick={toggleDisplay}
        className={displayState ? "arrow-expand" : "arrow-collapse"}
      >
        {NavArrow()}
      </a>
    </nav>
  );
};

export default Navigation;
