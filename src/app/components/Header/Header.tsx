import { useState } from "react";
import { Unlocked, Locked } from "../Icons";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <header>
        <h1 className="title">GROUPER</h1>
        <div className="header-utils">
          {loggedIn
            ? Unlocked({ color: "white", className: "unlocked" })
            : Locked({ color: "white", className: "locked" })}
        </div>
      </header>
    </>
  );
};

export default Header;
