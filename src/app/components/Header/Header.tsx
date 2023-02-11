import { useState } from "react";
import { Unlocked, Locked, Settings, Help } from "../Icons";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <header>
        <h1 className="title">GROUPER</h1>
        <div className="header-utils">
          {loggedIn
            ? Unlocked({
                color: "white",
                className: "unlocked",
                size: ".66rem"
              })
            : Locked({ color: "white", className: "locked", size: ".93rem" })}
          {Settings({ color: "white", className: "settings-btn" })}
          {Help({ color: "white", className: "help-btn" })}
        </div>
      </header>
    </>
  );
};

export default Header;
