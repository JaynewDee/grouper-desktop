import { useState } from "react";
import { Unlocked, Locked, Settings, Help } from "../Icons";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLock = () => {
    setLoggedIn((prev) => !prev);
  };
  const Lock = loggedIn
    ? Unlocked({
        color: "white",
        className: "unlocked",
        size: ".93rem",
        onClick: toggleLock
      })
    : Locked({
        color: "white",
        className: "locked",
        size: ".93rem",
        onClick: toggleLock
      });

  return (
    <>
      <header>
        <h1 className="title">GROUPER</h1>
        <div className="header-utils">
          {Lock}
          {Settings({ color: "white", className: "settings-btn" })}
          {Help({ color: "white", className: "help-btn" })}
        </div>
      </header>
    </>
  );
};

export default Header;
