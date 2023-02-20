import React, { useState } from "react";
import "./Navigation.css";

import { GroupIcon, NavArrow, Placeholder, StudentIcon } from "../Icons";
import { FC } from "react";
import "./Navigation.css";
import { useFileContextState } from "../../context/FileContext";

const Navigation: FC<any> = ({ view }) => {
  const [displayState, setDisplayState] = useState(true);

  const toggleDisplay = (e: any) => setDisplayState((prev) => !prev);

  const { adjustView } = useFileContextState();

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
