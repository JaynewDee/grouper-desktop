import { FC } from "react";
import { HeaderProps } from "../../Types";
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
