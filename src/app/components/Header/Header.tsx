import { useEffect, useState, FC } from "react";
import { Unlocked, Locked, Settings, Help } from "../Icons";
import "./Header.css";

interface HeaderProps {
  isLoggedIn: boolean;
  setLoggedIn: any;
}

const Header: FC<HeaderProps> = ({ isLoggedIn, setLoggedIn }) => {
  const toggleLock = () => {
    setLoggedIn((prev: boolean) => !prev);
  };
  const Lock = isLoggedIn
    ? Unlocked({
        color: "white",
        className: "unlocked",
        size: ".86rem",
        onClick: toggleLock
      })
    : Locked({
        color: "white",
        className: "locked",
        size: ".86rem",
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
