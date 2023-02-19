import { useEffect, useState, FC } from "react";
import { HeaderProps } from "../../Types";
import { Unlocked, Locked, Settings, Help } from "../Icons";
import "./Header.css";

const Header: FC<HeaderProps> = () => {
  return (
    <>
      <header>
        <h1 className="title">GROUPER</h1>
      </header>
    </>
  );
};

export default Header;
